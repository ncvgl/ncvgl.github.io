# Deployment Guide

This guide will help you deploy your AI Research Blog to GitHub Pages.

## Prerequisites

- A GitHub account
- Git installed on your computer
- Basic knowledge of Git commands

## Step 1: Create a GitHub Repository

1. Go to [GitHub](https://github.com) and sign in
2. Click the "+" icon in the top right corner
3. Select "New repository"
4. Name your repository (e.g., `ai-research-blog`)
5. Make it public
6. Don't initialize with README (we already have one)
7. Click "Create repository"

## Step 2: Push Your Blog to GitHub

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit the changes
git commit -m "Initial commit: AI Research Blog"

# Add your GitHub repository as remote
git remote add origin https://github.com/yourusername/your-repo-name.git

# Push to GitHub
git push -u origin main
```

## Step 3: Configure GitHub Pages

1. Go to your repository on GitHub
2. Click on "Settings" tab
3. Scroll down to "GitHub Pages" section
4. Under "Source", select "Deploy from a branch"
5. Choose "main" branch
6. Select "/ (root)" folder
7. Click "Save"

## Step 4: Update Configuration

Before your site goes live, update the `_config.yml` file:

```yaml
# Update these values with your information
title: Your Blog Title
description: Your blog description
author: Your Name
email: your-email@example.com
url: "https://yourusername.github.io/your-repo-name"

# Update social media links
social:
  github: yourusername
  twitter: yourusername
  linkedin: yourusername
```

Also update the `robots.txt` file:
```
User-agent: *
Allow: /

Sitemap: https://yourusername.github.io/your-repo-name/sitemap.xml
```

## Step 5: Test Your Site

1. Wait a few minutes for GitHub Pages to build your site
2. Visit `https://yourusername.github.io/your-repo-name`
3. Your blog should be live!

## Step 6: Custom Domain (Optional)

If you want to use a custom domain:

1. Purchase a domain from a domain registrar
2. In your repository settings, under "GitHub Pages"
3. Enter your custom domain in the "Custom domain" field
4. Create a `CNAME` file in your repository root with your domain:
   ```
   yourdomain.com
   ```
5. Configure DNS with your domain registrar:
   - Add a CNAME record pointing to `yourusername.github.io`
   - Or add A records pointing to GitHub's IP addresses

## Local Development

To test your blog locally before deploying:

### Option 1: Using Docker (Recommended)

```bash
# Create a Dockerfile
echo 'FROM jekyll/jekyll:4.2.0
COPY . /srv/jekyll
EXPOSE 4000
CMD ["jekyll", "serve", "--host", "0.0.0.0"]' > Dockerfile

# Build and run
docker build -t my-blog .
docker run -p 4000:4000 my-blog
```

### Option 2: Using Ruby (if available)

```bash
# Install Ruby and Jekyll
sudo apt-get install ruby-full build-essential
gem install jekyll bundler

# Install dependencies
bundle install

# Run locally
bundle exec jekyll serve
```

## Adding New Posts

1. Create a new file in `_posts/` with format: `YYYY-MM-DD-title.md`
2. Add front matter:
   ```markdown
   ---
   layout: post
   title: "Your Post Title"
   date: 2024-12-19
   author: Your Name
   description: "Brief description"
   tags: [tag1, tag2]
   ---
   ```
3. Write your content in Markdown
4. Commit and push to GitHub

## Troubleshooting

### Site Not Loading
- Check if GitHub Pages is enabled in repository settings
- Verify the branch and folder settings
- Check the Actions tab for build errors

### Styling Issues
- Make sure all CSS files are in the `assets/css/` directory
- Check that file paths in HTML are correct
- Clear browser cache

### Images Not Showing
- Place images in `assets/images/` directory
- Use relative paths: `/assets/images/filename.jpg`
- Check file permissions

### Code Highlighting Not Working
- Ensure Rouge is listed in `_config.yml` plugins
- Check that code blocks use proper syntax: ` ```language `

## Performance Tips

1. **Optimize Images**: Compress images before uploading
2. **Minimize Dependencies**: Only include necessary CSS/JS
3. **Use CDN**: Consider using CDN for external resources
4. **Enable Compression**: GitHub Pages automatically compresses content

## Security

1. **Don't Commit Secrets**: Never commit API keys or passwords
2. **Use Environment Variables**: For any sensitive configuration
3. **Regular Updates**: Keep dependencies updated
4. **HTTPS**: GitHub Pages automatically provides HTTPS

## Analytics

To add Google Analytics:

1. Create a Google Analytics account
2. Get your tracking ID (UA-XXXXXXXX-X)
3. Update `_config.yml`:
   ```yaml
   google_analytics: UA-XXXXXXXX-X
   ```

## Support

If you encounter issues:

1. Check the [GitHub Pages documentation](https://docs.github.com/en/pages)
2. Review the [Jekyll documentation](https://jekyllrb.com/docs/)
3. Search existing GitHub issues
4. Create a new issue with detailed information

---

**Your blog is now ready to share with the world! 🎉**