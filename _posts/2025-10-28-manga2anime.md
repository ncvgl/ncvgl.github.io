---
layout: simple-post
title: "Manga2Anime"
date: 2025-10-28
author: Nathan Cavaglione
description: "Bringing black & white pages to life with Google's AI models"
image: "/assets/images/hxh.webp"
---

<img src="/assets/images/hxh.webp" alt="Hunter x Hunter manga panels transformed to anime" style="max-width: 600px; width: 100%; height: auto; display: block; margin: 20px 0;">

## From Static Panels to Moving Animation

I got a little addicted to turning my favorite mangas into animated versions using Google's Nano Banana, Imagen3 and Veo3.1 models. What started as an experiment became a week-long exploration of what's possible (and what's not) with current AI video generation. Below is my best creation.

<div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; margin: 20px 0;">
  <iframe
    style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"
    src="https://www.youtube.com/embed/cDc-BdmJZK8"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen>
  </iframe>
</div>

## The Reality Check

After spending a day working with Veo 3.1 to turn half a chapter into an animated version, I had to walk back on my initial excitement: **we're still not there yet** on full automatic manga-to-anime generation.

Video and image models are mind-blowing, but turning static manga into moving anime is a different beast. The main limitation is that the model has to invent too much. It can't take a style reference for how the anime should look yet, so it fills in the blanks and drifts too far from the intended style. The results are good enough for fan-made action, but not studio quality.

Another limitation is keeping voice and character consistency across scenes, with currently no feature for those except prompting.

## The Recipe

That said, I found a few cheap tricks that make the difference. The key idea is to have very neat "base images" to generate the videos from:

1. **Crop the image** from the manga with a screenshot tool
2. **Remove any undesirable elements** using Imagen3 (paint the areas you want removed, like text bubbles)
3. **Color the image** using Gemini Nano Banana (tell it "Color EVERYTHING in this image" otherwise it gets lazy)
4. **Extend the image** with Imagen3 to fit a 16:9 format (that's what Veo 3.1 expects)
5. **Animate it** using Veo3.1 and mention the text bubbles so they are generated in the audio
6. **Stick all the videos together** using gemini-cli, with a low volume soundtrack to convey emotions

It's not anything that can be easily automated with code. A lot of redoing with custom prompting is involved, but it can accelerate the work of artists.

Here is a video breaking down the process visually:

<div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; margin: 20px 0;">
  <iframe
    style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"
    src="https://drive.google.com/file/d/1vcRVT0qS76wk691K-Df1zaH9PcJ37gpz/preview"
    frameborder="0"
    allow="autoplay"
    allowfullscreen>
  </iframe>
</div>

## The Verdict

AI is evolving fast, but full studio automation is still a few steps away.