---
layout: simple-post
title: "Minimalist Markdown Guide for GitHub Pages"
date: 2025-07-03
author: Nathan Cavaglione
description: "Just a list of syntax + example"
image: "/assets/images/markdown.png"
---

<img src="/assets/images/markdown.png" alt="Markdown Guide" style="max-width: 400px; width: 100%; height: auto; display: block; margin: 20px 0;">

This guide covers all the Markdown syntax you can use on GitHub Pages, with both the syntax and rendered examples for each feature.

## Headings

# Heading level 1
## Heading level 2
### Heading level 3
#### Heading level 4
##### Heading level 5
###### Heading level 6

```markdown
# Heading level 1
## Heading level 2
### Heading level 3
#### Heading level 4
##### Heading level 5
###### Heading level 6
```

---

## Paragraphs and Line Breaks

This is a paragraph.

This is another paragraph with  
two spaces at the end for a line break.

This is a third paragraph.

```markdown
This is a paragraph.

This is another paragraph with  
two spaces at the end for a line break.

This is a third paragraph.
```

---

## Emphasis

**bold text** and __bold text__

```markdown
**bold text**
__bold text__
```

*italic text* and _italic text_

```markdown
*italic text*
_italic text_
```

***bold and italic*** and ___bold and italic___

```markdown
***bold and italic***
___bold and italic___
```

---

## Lists

- First item
- Second item
- Third item
  - Indented item
  - Another indented item

```markdown
- First item
- Second item
- Third item
  - Indented item
  - Another indented item
```

1. First item
2. Second item
3. Third item
   1. Indented item
   2. Another indented item

```markdown
1. First item
2. Second item
3. Third item
   1. Indented item
   2. Another indented item
```

---

## Links

[Link text](https://example.com) and [Link with title](https://example.com "Title text")

```markdown
[Link text](https://example.com)
[Link with title](https://example.com "Title text")
```

[Link text][reference]

[reference]: https://example.com "Optional title"

```markdown
[Link text][reference]

[reference]: https://example.com "Optional title"
```

<https://example.com> and <fake@example.com>

```markdown
<https://example.com>
<fake@example.com>
```

---

## Images

![Alt text](image.jpg)
![Alt text](image.jpg "Image title")

```markdown
![Alt text](image.jpg)
![Alt text](image.jpg "Image title")
```

[![Alt text](image.jpg)](https://example.com)

```markdown
[![Alt text](image.jpg)](https://example.com)
```

---

## Code

Use `code` in your text.

Use ` code ` in your text.

```
print("Hello, World!")
```

Use ``` on the line before and after

---

## Blockquotes

> First level
> 
>> Second level
>> 
>>> Third level

```markdown
> First level
> 
>> Second level
>> 
>>> Third level
```

---

## Horizontal Rules

---

```markdown
---
***
___
```

---

## Tables

| Header 1 | Header 2 | Header 3 |
|----------|----------|----------|
| Cell 1   | Cell 2   | Cell 3   |
| Cell 4   | Cell 5   | Cell 6   |

```markdown
| Header 1 | Header 2 | Header 3 |
|----------|----------|----------|
| Cell 1   | Cell 2   | Cell 3   |
| Cell 4   | Cell 5   | Cell 6   |
```

| Left | Center | Right |
|:-----|:------:|------:|
| Left | Center | Right |

```markdown
| Left | Center | Right |
|:-----|:------:|------:|
| Left | Center | Right |
```

---

## Task Lists

- [x] Completed task
- [ ] Incomplete task
- [x] Another completed task

```markdown
- [x] Completed task
- [ ] Incomplete task
- [x] Another completed task
```

---

## Strikethrough

~~strikethrough text~~

```markdown
~~strikethrough text~~
```

---

## Escaping Characters

\* Not a bullet point, \` Not inline code, \[ Not a link

```markdown
\* Not a bullet point
\` Not inline code
\[ Not a link
```

---

## HTML Support

<details>
<summary>Click to expand</summary>

Content inside the collapsible section.
</details>

```markdown
<details>
<summary>Click to expand</summary>

Content inside the collapsible section.
</details>
```

---

## Footnotes

Here's a sentence with a footnote[^1].

[^1]: This is the footnote content.

```markdown
Here's a sentence with a footnote[^1].

[^1]: This is the footnote content.
```

---

## Definition Lists

Term 1
: Definition 1

Term 2
: Definition 2

```markdown
Term 1
: Definition 1

Term 2
: Definition 2
```

---

## Comments

<!-- This comment won't be visible in the rendered output -->

```markdown
<!-- This is a comment that won't be rendered -->
```

---

This guide covers all the major Markdown features supported by GitHub Pages. 
Remember that some features might vary depending on your specific Jekyll theme or configuration. 