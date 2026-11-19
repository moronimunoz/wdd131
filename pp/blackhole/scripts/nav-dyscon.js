(() => {
  /* =========================================================
     Nav estilo DyScon: mismo comportamiento que main.js del index
     1. Menú hamburguesa (☰ / ✕), se cierra al tocar un link o con Escape
     2. Sombra del header al bajar (clase con-sombra)
     3. Resalta en el menú la sección que se está viendo (links con #ancla)
     ========================================================= */
  
  // ---------- 1. Menú hamburguesa en móviles ----------
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.getElementById('nav');
  
  if (toggle && nav) {
    const estadoMenu = (abierto) => {
      nav.classList.toggle('abierto', abierto);
      toggle.setAttribute('aria-expanded', abierto);
      toggle.setAttribute('aria-label', abierto ? 'Cerrar menú' : 'Abrir menú');
      toggle.textContent = abierto ? '✕' : '☰';
    };
  
    toggle.addEventListener('click', () => estadoMenu(!nav.classList.contains('abierto')));
  
    nav.querySelectorAll('a').forEach(link =>
      link.addEventListener('click', () => estadoMenu(false))
    );
  
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && nav.classList.contains('abierto')) estadoMenu(false);
    });
  }
  
  // ---------- 2. Sombra del header al bajar ----------
  const header = document.getElementById('header');
  if (header) {
    const sombra = () => header.classList.toggle('con-sombra', window.scrollY > 10);
    window.addEventListener('scroll', sombra, { passive: true });
    sombra();
  }
  
  // ---------- 3. Resaltar en el menú la sección que se está viendo ----------
  const linksMenu = document.querySelectorAll('.nav a[href^="#"]');
  const secciones = [...linksMenu]
    .map(l => l.getAttribute('href').length > 1 ? document.querySelector(l.getAttribute('href')) : null)
    .filter(Boolean);
  
  if (secciones.length) {
    const espia = new IntersectionObserver((entradas) => {
      entradas.forEach(e => {
        if (e.isIntersecting) {
          linksMenu.forEach(l =>
            l.classList.toggle('activo', l.getAttribute('href') === '#' + e.target.id)
          );
        }
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
  
    secciones.forEach(s => espia.observe(s));
  }
})();
