FROM jekyll/jekyll:4.2.0

# Copy the blog files
COPY . /srv/jekyll

# Expose port 4000
EXPOSE 4000

# Start Jekyll server
CMD ["jekyll", "serve", "--host", "0.0.0.0", "--port", "4000"]