---
layout: simple-post
title: "Retrofitting Legacy Forms"
date: 2025-08-17
author: Nathan Cavaglione
description: "Because governments still love their PDFs"
image: "/assets/images/fill-my-paperwork.png"
---

<img src="/assets/images/fill-my-paperwork.png" alt="Legacy Forms" style="max-width: 400px; width: 100%; height: auto; display: block; margin: 20px 0;">

So the other day, I had to fill another government form by paper. Take a photo. Send it back. The usual.

Let's say I'd had enough of this workflow. Government sends you a PDF, you print it, fill it by hand, scan it, email it back. Or you try some digital tools you have to pay for.

So I got bored of the repetitive work and built a service to fix this. Upload your form, it detects the fields, fills them with fake data, you correct what needs correcting, download, send.

Basically retrofitting legacy forms that organisations could not bother to put into a proper website. Not that I blame them - building web forms is work. PDF Forms are easy to switch and update.

It is a simple side project that helps with daily admin tasks. Taxes, subscriptions, utilities - all those forms that live in the stone age of user experience.

For now it's fake data only, but I'm considering an extension where you store your actual info and it auto-fills everything. 

Every time I use this, I'm reminded that good UX isn't about flashy animations or trendy frameworks. It's about removing the gap between what you want to do and actually doing it.

Government forms are the perfect example of that gap. They want your information. You want to give it to them. But somehow we've created this elaborate ritual involving printers, scanners, and PDF readers from 2003.

Sometimes the best innovation is just... making things work. The service is free, no login, no storage, open-source.

The website is [here](https://fill-my-papers-424605661533.europe-west9.run.app/).
The code is [here](https://github.com/ncvgl/fill-my-paperwork).
