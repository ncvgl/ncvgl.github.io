---
layout: simple-post
title: "A Prompt Queue for Claude Code"
date: 2026-04-10
author: Nathan Cavaglione
description: "30 lines of bash so you can walk away"
image: "/assets/images/prompt-queue.jpeg"
---

<img src="/assets/images/prompt-queue.jpeg" alt="Claude Code prompt queue plugin" style="max-width: 600px; width: 100%; height: auto; display: block; margin: 20px 0;">

**[github.com/ncvgl/claude-prompt-queue](https://github.com/ncvgl/claude-prompt-queue)**

Codex launched with task queues. Claude Code was missing one. Not anymore.

You give it a task. It finishes. Then stops. No queue. No batching. Just waiting for you.

You can't walk away. You have to sit there feeding it prompts like in 2023.

It's also one of the most requested features on their GitHub.

So I added it with a plugin. 30 lines of bash. Using stop hooks.

```
next: refactor the auth module
next: write tests for it
next: just keep going, resolve any question by yourself
```

Queue 10 tasks. Walk away. Come back to finished work.

Install with:

```
/plugin marketplace add ncvgl/claude-prompt-queue
/plugin install prompt-queue@prompt-queue-marketplace
```

**FAQ**: Yes, Claude has an implicit CreateTask tool but it can stop in the middle of a task asking a question that you are not there to answer. This plugin forces Claude to continue.
