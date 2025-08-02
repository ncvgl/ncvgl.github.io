# AI Research Blog

A modern, responsive blog built with Jekyll for sharing AI research, tutorials, and insights. This blog features a beautiful design optimized for technical content and is ready to deploy on GitHub Pages.

## Features

- 🎨 **Modern Design**: Clean, professional design with excellent typography
- 📱 **Responsive**: Fully responsive design that works on all devices
- ⚡ **Fast**: Optimized for performance with minimal dependencies
- 🔍 **SEO Optimized**: Built-in SEO features and meta tags
- 📝 **Code Highlighting**: Syntax highlighting for code blocks
- 🎯 **Accessible**: WCAG compliant design
- 📊 **Analytics Ready**: Google Analytics integration ready
- 🔗 **Social Media**: Social media sharing and links

## Quick Start

### Prerequisites

- Ruby 2.6 or higher
- RubyGems
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/your-repo-name.git
   cd your-repo-name
   ```

2. **Install dependencies**
   ```bash
   bundle install
   ```

3. **Configure the blog**
   Edit `_config.yml` and update:
   - Site title and description
   - Your email and social media links
   - GitHub Pages URL

4. **Run locally**
   ```bash
   bundle exec jekyll serve
   ```
   
   Visit `http://localhost:4000` to see your blog.

## Configuration

### Basic Settings

Update `_config.yml` with your information:

```yaml
title: Your Blog Title
description: Your blog description
author: Your Name
email: your-email@example.com
url: "https://yourusername.github.io/your-repo-name"
```

### Social Media

Add your social media profiles:

```yaml
social:
  github: yourusername
  twitter: yourusername
  linkedin: yourusername
```

### Google Analytics

To enable Google Analytics, uncomment and add your tracking ID:

```yaml
google_analytics: UA-XXXXXXXX-X
```

## Content Structure

### Adding New Posts

1. Create a new file in `_posts/` with the format: `YYYY-MM-DD-title.md`
2. Add front matter:

```markdown
---
layout: post
title: "Your Post Title"
date: 2024-12-19
author: Your Name
description: "Brief description of your post"
tags: [tag1, tag2, tag3]
---
```

3. Write your content in Markdown

### Post Features

- **Code highlighting**: Use triple backticks with language specification
- **Images**: Place images in `assets/images/` and reference with `![alt](path)`
- **Tags**: Add tags in the front matter for categorization
- **Reading time**: Automatically calculated and displayed

### Example Post

```markdown
---
layout: post
title: "Getting Started with AI"
date: 2024-12-19
author: Your Name
description: "A beginner's guide to artificial intelligence"
tags: [AI, Tutorial, Beginner]
---

# Getting Started with AI

Your content here...

## Code Example

```python
def hello_world():
    print("Hello, AI World!")
```

## Conclusion

Wrap up your post...
```

## Customization

### Styling

The blog uses CSS custom properties for easy theming. Main colors are defined in `assets/css/main.css`:

```css
:root {
    --primary-color: #6366f1;
    --secondary-color: #10b981;
    --text-primary: #1f2937;
    /* ... more variables */
}
```

### Layouts

- `_layouts/default.html`: Main layout template
- `_layouts/post.html`: Blog post layout
- `index.html`: Homepage
- `posts.html`: All posts listing
- `about.html`: About page
- `contact.html`: Contact page

### Adding Pages

Create new pages by adding HTML files in the root directory with front matter:

```html
---
layout: default
title: Page Title
---

Your page content here...
```

## Deployment

### GitHub Pages

1. **Enable GitHub Pages**
   - Go to your repository settings
   - Scroll to "GitHub Pages" section
   - Select "main" branch as source
   - Choose Jekyll as the theme source

2. **Update Configuration**
   - Update `_config.yml` with your GitHub Pages URL
   - Commit and push your changes

3. **Custom Domain (Optional)**
   - Add your custom domain in repository settings
   - Create a `CNAME` file with your domain

### Other Platforms

This blog can be deployed to any platform that supports Jekyll:
- Netlify
- Vercel
- GitLab Pages
- Any static hosting service

## Development

### Local Development

```bash
# Install dependencies
bundle install

# Start development server
bundle exec jekyll serve

# Build for production
bundle exec jekyll build
```

### File Structure

```
├── _config.yml          # Site configuration
├── _layouts/            # Layout templates
│   ├── default.html     # Main layout
│   └── post.html        # Post layout
├── _posts/              # Blog posts
├── assets/              # Static assets
│   ├── css/             # Stylesheets
│   ├── js/              # JavaScript
│   └── images/          # Images
├── index.html           # Homepage
├── posts.html           # Posts listing
├── about.html           # About page
├── contact.html         # Contact page
└── README.md            # This file
```

## Features in Detail

### Code Highlighting

The blog uses Rouge for syntax highlighting. Supported languages include:
- Python, JavaScript, TypeScript
- HTML, CSS, SCSS
- Ruby, PHP, Java
- SQL, JSON, YAML
- And many more

### Responsive Design

- Mobile-first approach
- Flexible grid system
- Optimized typography for all screen sizes
- Touch-friendly navigation

### Performance

- Minimal JavaScript
- Optimized CSS
- Lazy loading for images
- Efficient asset loading

### SEO Features

- Meta tags for social sharing
- Structured data markup
- Sitemap generation
- RSS feed
- Open Graph tags

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test locally
5. Submit a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

If you have questions or need help:

1. Check the [documentation](https://jekyllrb.com/docs/)
2. Search existing issues
3. Create a new issue with details

## Acknowledgments

- Built with [Jekyll](https://jekyllrb.com/)
- Icons by [Font Awesome](https://fontawesome.com/)
- Fonts by [Google Fonts](https://fonts.google.com/)
- Design inspired by modern web standards

---

**Happy blogging! 🚀**