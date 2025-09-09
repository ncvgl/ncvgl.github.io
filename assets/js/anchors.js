(function(){
  // Generate slug from text
  function slugify(text){
    return text
      .toString()
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9\s\-_.]/g, '') // remove punctuation except - _ .
      .replace(/\s+/g, '-')             // spaces to dashes
      .replace(/-+/g, '-')               // collapse dashes
      .replace(/^-/,'').replace(/-$/,'');
  }

  function ensureId(el){
    if(el.id) return el.id;
    const base = slugify(el.textContent || el.innerText || 'section');
    let id = base || 'section';
    let i = 2;
    while(document.getElementById(id)){
      id = base + '-' + i++;
    }
    el.id = id;
    return id;
  }

  function addAnchor(el){
    const id = ensureId(el);
    const a = document.createElement('a');
    a.href = '#' + id;
    a.className = 'header-anchor';
    a.setAttribute('aria-label', 'Link to this section');
    a.innerHTML = '🔗';
    a.addEventListener('click', function(e){
      // Copy absolute URL with hash to clipboard
      e.preventDefault();
      const url = window.location.origin + window.location.pathname + '#' + id;

      function fallbackCopy(text){
        const ta = document.createElement('textarea');
        ta.value = text;
        ta.setAttribute('readonly', '');
        ta.style.position = 'absolute';
        ta.style.left = '-9999px';
        document.body.appendChild(ta);
        ta.select();
        try { document.execCommand('copy'); } catch(_) {}
        document.body.removeChild(ta);
      }

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(url).catch(function(){ fallbackCopy(url); });
      } else {
        fallbackCopy(url);
      }

      // Visual feedback and update hash without jump
      a.classList.add('copied');
      setTimeout(function(){ a.classList.remove('copied'); }, 1200);
      if (history && history.replaceState) {
        history.replaceState(null, '', '#' + id);
      } else {
        window.location.hash = id;
      }
    });
    el.appendChild(a);
  }

  function init(){
    var container = document.querySelector('.article-content .content') || document;
    var headers = container.querySelectorAll('h1, h2, h3, h4, h5, h6');
    headers.forEach(addAnchor);
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
