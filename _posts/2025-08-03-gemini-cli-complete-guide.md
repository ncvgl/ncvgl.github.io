---
layout: simple-post
title: "Gemini CLI Reverse Engineering"
date: 2025-08-03
author: Nathan Cavaglione
description: "Learn how the Gemini CLI engine was coded under the hood"
image: "/assets/images/gemini-cli-img.png"
---

<img src="/assets/images/gemini-cli-img.png" alt="Gemini CLI" style="max-width: 400px; width: 100%; height: auto; display: block; margin: 20px 0;">

_Disclaimer: I created this article from the open-source [code](https://github.com/google-gemini/gemini-cli) on GitHub. Although I work at Google, I am not part of the Gemini CLI team and have not been in touch with them._

I was curious how gemini-cli was written, after all it worked quite well and was as close to Cursor as Google had gotten. 
With its awkward vim feeling, it was the first step of Gemini in the agent paradigm, where the LLM is augmented to interact with your computer through the command line.

On the product side, I think many like me were too lazy to leave IntelliJ for a VSCode-like editor like Cursor so they were mainly surfing the AI wave through IntelliJ plugins (eg: Gemini Code Assist), copy-pasting to online LLMs chat interace or had built their own custom solutions. gemini-cli came as a step up in the AI coding experience for those people. 

I need to say though, comparing Cursor to gemini-cli is where I understood the importance of the 'product' side in AI. Both engines have the same level of performance and intelligence, but Cursor has already solved all the little things that can be annoying when coding with AI: applying changes, switching LLMs, tracking context length, scanning a directory… All those little frictions that show the limitations of human-agents interactions have been solved already with opinionated takes on features, which makes the experience so much smoother. That's the value in paying for Cursor.

But onto gemini-cli, which is a very open-ended agent, allows you to build anything, but sometimes goes down the rabbit hole.
Is it something you could have built yourself easily ? Let's dig into it. 

# The Prompts

There are only 2 and both located at `packages/core/src/core/prompts.ts`

We start by them because this 'natural language' (NL) code is more important than programming code itself, which machines have widely automated, while NL code speaks more directly of the intent and design decisions of the programmers.

## The Core System Prompt 

This one is 20 page long - yes hard to believe - and defines the agent's behavior 360 degrees. 
I compiled some of the most clear cut instructions below: 

* **Core Mandates**: Guidelines for code conventions, libraries/frameworks usage, style & structure, comments, proactiveness.

`Mimic the style (formatting, naming), structure, framework choices, typing, and architectural patterns of existing code`

`NEVER assume a library/framework is available or appropriate`

`*NEVER* talk to the user or describe your changes through comments`

* **Primary Workflows**: Detailed instructions for software engineering tasks and new application development.

`Use 'grep' and 'glob' search tools extensively to understand file structures, existing code patterns, and conventions`

* **Operational Guidelines**: Tone and style for CLI interaction, security rules, tool usage guidelines

`Always apply security best practices. Never introduce code that exposes, logs, or commits secrets, API keys, or other sensitive information`

`Use the 'memory' tool to remember specific, *user-related* facts or preferences when the user explicitly asks`

`Execute multiple independent tool calls in parallel when feasible`

It is funny to see many of the inner logic we would have hardcoded in a traditional software is here exposed to the agent as concepts it should use, but can also decide not to.

* **Environment-specific instructions**: Different prompts for sandbox vs non-sandbox environments. Here a different prompt is appended depending on the user environment. Any user-related memory is added.

* **Git repository handling**: Special instructions when working in git repositories

`When asked to commit changes or prepare a commit, always start by gathering information using shell commands`

`Prefer commit messages that are clear, concise, and focused more on 'why' and less on 'what'`

Surprisingly, there were many instructions that seemed too vague to be useful for the LLM and cluttered the context like:
`Think about the user's request and the relevant codebase context`

There were also some few-shot examples provided like:
`user: list files here. → [tool_call: ls for path '/path/to/project']`

## The Compression Prompt

Managing context is key to effective agents and so a strategy is employed here to keep it short.

The prompts asks for summarizing conversation history into structured XML format with sections like:

* `<overall_goal>`
* `<key_knowledge>`
* `<file_system_state>`
* `<recent_actions>`
* `<current_plan>`

Here is an extract that is quite self-explanatory: 

```
When the conversation history grows too large, you will be invoked to distill the entire history into a concise, structured XML snapshot. 
This snapshot is CRITICAL, as it will become the agent's *only* memory of the past. 

First, you will think through the entire history in a private <scratchpad>. 
Review the user's overall goal, the agent's actions, tool outputs, file modifications, and any unresolved questions. 
Identify every piece of information that is essential for future actions.

After your reasoning is complete, generate the final <state_snapshot> XML object. 
Be incredibly dense with information. Omit any irrelevant conversational filler.
```

