export const loadComments = (post) => {
  (window as any).disqus_config = function () {
    this.page.url = window.location.href;
    this.page.identifier = post.slug;
  };

  const script = document.createElement('script');
  script.src = 'https://nextjs-ghostcms-blog.disqus.com/embed.js';
  script.setAttribute('data-timestamp', Date.now().toString());

  document.body.appendChild(script);
}