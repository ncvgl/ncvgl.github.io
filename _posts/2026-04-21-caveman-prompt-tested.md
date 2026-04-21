---
layout: simple-post
title: "I Tested The Viral Caveman Prompt On 100 Coding Tasks"
date: 2026-04-21
author: Nathan Cavaglione
description: "65% token savings was the promise. 14% is the reality."
image: "/assets/images/caveman-mosaic-thumb.png"
---

<img src="/assets/images/caveman-mosaic.png" alt="Mosaic of 731 SWE-bench Pro Public instances ordered by difficulty. Each cell is split horizontally — top half = baseline, bottom half = caveman. Green = resolved, red = failed, gray = not tested. Our 101-instance frontier band appears as a colored stripe across the gray." style="max-width: 600px; width: 100%; height: auto; display: block; margin: 20px auto;">

40,000 people starred the [caveman prompt](https://github.com/JuliusBrussee/caveman). It promises **65% token savings** by making LLMs talk like cavemen — *"why use many token when few token do trick."* Catchy, viral, fun.

So I tested it.

**Result: a marginal 14% on real coding tasks, not 65%.** And in 1 instance out of 3, caveman actually made the model use *more* tokens than baseline.

This post is the receipts.

## Setup

Claude Code (`claude -p`) running Haiku 4.5, on [SWE-bench Pro Public](https://github.com/scaleapi/SWE-bench_Pro-os) — ScaleAI's hand-picked benchmark of real GitHub issues across multiple languages. I picked 101 instances ranked at difficulty 100–200 (the frontier: hard enough to stress the agent, easy enough that a resolve-rate delta is measurable).

Each task ran twice with the same user prompt. Once vanilla, once with the caveman system prompt appended via `--append-system-prompt`. Same model, same tools (Read/Edit/Write/Bash/Grep — WebFetch/WebSearch off), same deterministic grader. Only the system prompt differs.

## Headline numbers

|  | baseline | caveman | Δ |
|---|---|---|---|
| Resolve rate | **93.5%** (86/92) | **90.2%** (83/92) | −3% |
| Total cost | $38.06 | $33.66 | −12% |
| Avg cost/run | $0.41 | $0.37 | −12% |
| Avg output tokens/run | 15.3 k | 13.2 k | **−14%** |
| Avg turns/run | 42 | 39 | −8% |
| Avg duration/run | 5.2 min | 4.6 min | −12% |

92 paired instances completed (9 hit dataset defects on the SWE-bench side and were dropped). Caveman is cheaper, faster, and slightly less reliable — but the resolve-rate gap is not statistically significant at this n.

## Why is it 14%, not 65%?

Because in an agentic coding loop, the model doesn't actually emit much prose.

I went through every session transcript and measured what fraction of the model's output is narrative text vs. structured content (tool-call JSON, file paths, code, diffs):

- **Baseline output: 13.3% prose, 86.7% structured (tool calls, file contents, code).**
- **Caveman output: 9.5% prose, 90.5% structured.**

That number is the ceiling. **Even if caveman compressed all prose to zero, the maximum possible savings on output tokens is ~13%.** We measured 14%. Caveman is doing roughly the best it could possibly do given how much prose is even *available* to compress.

The 65% headline figure on caveman's repo comes from natural-language chat tasks where prose is 90%+ of the output. In an agent loop, that's flipped — the model is mostly generating Bash commands, Edit operations, and reading code. None of that can be cavemanned. *"chk file. edit fn. run test."* is fine for prose; you can't compress `Bash(command="CGO_ENABLED=0 go test ./models -run TestGetCveContentTypes -v 2>&1")`.

## The case where caveman *doubled* the tokens

The mean (−14%) hides a wild distribution. Here's the per-instance histogram of token savings, in 10% bins:

<img src="/assets/images/caveman-token-histogram.png" alt="Histogram of per-instance output-token savings comparing caveman vs baseline. Green bars (right of zero) show instances where caveman used fewer tokens; red bars (left of zero) show instances where caveman used more. Distribution is roughly symmetric around zero with a slight right-skew." style="max-width: 700px; width: 100%; height: auto; display: block; margin: 20px auto;">

Caveman saved tokens on 66% of instances. But it *increased* them on 34% — up to **+102% on one instance** (it literally doubled the output).

I dug into that doubling case (`vuls-73f0adad`, a Go vulnerability-scanner task). Both conditions resolved the task. But:

| | baseline | caveman |
|---|---|---|
| Files patched | 1 | 2 |
| Patch size | +14 / −0 | +28 / −6 |
| Total tool calls | 24 | **69** |
| Read calls | 6 | 22 |
| Grep calls | 1 | 11 |
| Sub-agent spawns | 0 | 1 |

Both started identically: read the test, read the source, grep for constants. Both edited the right file and made the test pass. Baseline stopped there. **Caveman didn't.** It launched a 30-step exploration sweep through the rest of the codebase looking for callers of the function it just modified, spawned an Explore sub-agent, and edited a *second* file that didn't actually need editing — the test passes without those changes.

So caveman's compressed-output style didn't make the model write less. It made the model do more *work*. Each tool call carries its own input/output token overhead. Saving 5 tokens per text block doesn't help if you make 45 extra tool calls.

This isn't unique to caveman — it's a general pattern when you tell a model to be terse. The saved budget gets reinvested somewhere, often in additional exploration.

## Same problem, different code

Here's the surprise nobody asked for. Of the 79 instances where both conditions resolved, only **3 produced byte-identical patches**. The other 76 reached different valid solutions:

- Same target files in 61% of cases (median file-Jaccard = 1.0)
- But the actual changed lines are mostly different — median line-Jaccard 0.35
- 43% of pairs had less than 30% line overlap

In other words: the two configurations agreed on *where* the bug was, but wrote substantively different code to fix it. Caveman isn't just writing a terser version of the baseline patch — the model takes a visibly different path and lands on a different valid fix.

This is partly a property of SWE-bench Pro (its grader admits many valid implementations per task), but it's also a reminder: a prompt-style change isn't surface-level. It rewires the trajectory.

## The variance argument

If you're a single user, the mean is what you experience. If you're running an agent loop at scale, the *tail* is what kills you.

Caveman's per-instance variance is large — savings range from −102% (doubled) to +71% (saved two-thirds). A worst-case 2× run busts your budget assumptions in production. Mean savings of 14% with that much variance is a different operational story than 14% with tight variance.

## So should you use it?

**At scale — automated agentic systems running thousands of jobs a day — turn it on.** 12% lower cost is millions of dollars at any non-trivial volume. The variance hurts but doesn't dominate the average. The quality risk is real but small (3pp non-significant gap on our data).

**As a single user — I wouldn't bother.** You trade a layer of visibility into the model's reasoning (the prose is where you see *why* the model is doing what it's doing) for savings that don't move the needle on a personal API bill. And you absorb the worst-case variance one run at a time, which is more annoying than the average suggests.

## Caveats

- Single model (Haiku 4.5). Larger models with more reasoning capacity might respond differently to the compression instruction.
- Single harness (Claude Code in headless mode). Other agent frameworks may show different ratios of prose to tool-args.
- The caveman system prompt itself adds ~69 lines of instructions and examples to caveman's input — so this is "caveman as deployed," not "output compression in pure isolation."
- n=92 means we can rule out a >7pp resolve-rate regression with 95% confidence; we cannot rule out a 3pp regression at this sample size.

## The real lesson

Tested in chat ≠ works in agent. When the bulk of your model's output is structured (tool args, code, file contents), output-style tweaks can't move the needle far. **Always run a paired A/B on your actual workload before believing a prompt-engineering claim, especially a viral one.**

Caveman works. It was just oversold by the hype, for coding at least.

---

**Full data, every patch, every session transcript, reproducible at**
[github.com/ncvgl/does-caveman-kill-claude](https://github.com/ncvgl/does-caveman-kill-claude)
