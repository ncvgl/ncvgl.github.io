---
layout: simple-post
title: "Coding has become AI agent management"
date: 2026-03-02
author: Nathan Cavaglione
description: "What cloning Slack with Claude Code taught me about the future of software development"
---

**Code: [github.com/ncvgl/slawk](https://github.com/ncvgl/slawk)**

I posted about building a Slack clone using multiple AI agents. The response surprised me. Nobody asked "what did you build?". They asked: **"How did the agents talk to each other?"**

## The Evolution: From Prompting to Orchestrating

When I started this experiment three days ago, I treated Claude like a very smart assistant. I'd write detailed prompts, get code back, review it, write another prompt. Rinse and repeat.

That lasted about four hours.

The problem wasn't the quality - it was the **context bloat**. After 20-30 exchanges, I noticed the agent getting slower. More confused. Sometimes hallucinating things we'd already discussed. Compaction would kick in and I'd wait 2-3 minutes while it summarized the conversation.

It was boring.

So I tried something different: **What if I treated AI like a dev team instead of a chatbot?**

## The Team Structure That Actually Works

Here's what I landed on:

**One persistent "CTO" session** that plans, delegates, and reviews. It never writes code. It just thinks.

**Ephemeral "developer" sessions** that get spawned for single tasks, build the feature, commit, and get deleted. No conversation history. No memory of previous tasks.

**Disposable "QA" sessions** that test the app like a human user, report bugs, and disappear.

Let me show you how this actually works with a real example.

## A Real Task: Implementing Thread Replies

Here's the prompt I gave the CTO:

```
Implement thread replies as the next feature.
Use TDD: write Playwright test first, then implement.
The feature should work end-to-end (backend + frontend).
Commit when done and report back.
```

That's it. The CTO then:

1. **Plans the task** (what needs to be built on backend vs frontend)
2. **Spawns a developer agent** with this prompt it made up:

```
You are implementing thread replies for a Slack clone.

Backend requirements:
- Add thread_id foreign key to messages table
- Add GET /api/messages/:id/replies endpoint
- Add real-time events for new replies

Frontend requirements:
- Add "Reply in thread" button to messages
- Add right sidebar that shows thread when opened
- Show reply count on parent message
- Real-time updates when new replies arrive

Process:
1. Write Playwright test that verifies the full flow
2. Implement backend changes
3. Implement frontend changes
4. Iterate until test passes
5. Run ALL existing tests to ensure nothing broke
6. Commit with message: "feat: Add thread replies"
```

3. **The developer agent does its thing** - and here's where it gets interesting.

The agent doesn't have context about previous features. So what does it do?

It explores:

```bash
grep -r "messages" backend/src --include="*.ts"
cat backend/src/routes/messages.ts
cat frontend/src/components/MessageList.tsx
```

This exploration uses maybe 5-6% of its context window. It finds exactly what it needs to know, ignores the rest, and gets to work.

## Why This Actually Works Better

**Fresh eyes catch mistakes.** Without context, the agent can't make assumptions. It has to read the actual code, which often reveals inconsistencies a human (or a context-loaded agent) would miss.

**TDD is the safety net.** If the agent misses something, the test fails. It iterates:

```
Test failed: Thread sidebar doesn't open when clicking reply count

Debugging... found the issue: missing event listener on reply count button
Fixed and re-running tests...

All tests passing ✅
```

**Speed matters.** A fresh agent responds in 5 seconds. A bloated agent with 150K tokens takes 15-20 seconds per response. Over 50 tasks, that's 8 minutes saved.

**Parallelization becomes possible.** When agents don't share context, they can work simultaneously. Use git worktrees (~= git branch) to allow them to touch the same files.

## The QA Agent: Testing Like a Human

After building 4-5 features, I tell the CTO:

```
Spawn a QA agent to test the app using the MCP browser extension.
Have it test the main features and report bugs it finds.
```

The CTO spawns a QA agent with this brief:

```
You are a QA engineer testing a Slack clone.

Open the app at http://localhost:5173 using Chrome MCP.
Test these features like a real user:
- Register a new account
- Create a channel
- Send messages
- Try replying in a thread
- Upload a file
- Use search

For each bug:
- Take a screenshot
- Note the steps to reproduce
- Rate severity (Critical/High/Medium/Low)

Write your findings to qa-report.md
```

And then something magical happens.

The QA agent actually *uses* the app in my Chrome browser like a real human. It clicks buttons. Fills forms. Uploads files. Takes screenshots when things look broken.

Link to the extension: https://code.claude.com/docs/en/chrome

After 10-15 minutes, I get a markdown file:

```markdown
# QA Report - Thread Feature Testing

## Bug #1: Thread sidebar doesn't show typing indicators
Severity: Medium
Steps: Open thread, have another user type a reply
Expected: See "User is typing..." in thread
Actual: No typing indicator appears

## Bug #2: Thread reply count doesn't update in real-time
Severity: High
Steps: User A opens channel, User B replies in thread
Expected: Reply count updates immediately
Actual: Need to refresh to see new count
```

The CTO reads this report and spawns fix agents for each bug.

## What About Token Costs?

People asked if this is expensive. Honest answer: I haven't looked closely.

I know the QA sessions use ~10-20 tool calls to find ~10 bugs. The developer sessions average 30-50K tokens per feature. The CTO session is sitting around 80K tokens after 3 days and I probably refreshed it once or twice.

Total? Maybe $20-30 so far? The velocity gains are worth 100x that.

## Conclusion

Writing functions, wiring up APIs, rendering UI - that's solved. Claude (or any modern AI) can do it with 90%+ accuracy if you give it clear requirements and a way to test its own work.

The shift from "I write code" to "I orchestrate agents" feels weird at first. Then it feels normal. Then you can't imagine going back.

