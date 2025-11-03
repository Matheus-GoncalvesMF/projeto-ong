
(function () {
  const onReady = (fn) => (document.readyState !== 'loading' ? fn() : document.addEventListener('DOMContentLoaded', fn));

  onReady(() => {

    addSkipLink();

    addLandmarks();

    enhanceDropdownMenu();

    enhanceFormValidation();

    enhanceModalA11y();

    ensureNavAriaCurrent();
  });

  function addSkipLink() {
    const body = document.body;
    const main = document.querySelector('main');
    if (!main) return;

    if (!main.id) main.id = 'conteudo-principal';

    const skip = document.createElement('a');
    skip.className = 'skip-link';
    skip.href = `#${main.id}`;
    skip.textContent = 'Pular para o conteúdo principal';
    body.insertBefore(skip, body.firstChild);
  }

  function addLandmarks() {
    const header = document.querySelector('header');
    const nav = document.querySelector('nav');
    const main = document.querySelector('main');
    const footer = document.querySelector('footer');

    header && header.setAttribute('role', 'banner');
    if (nav) {
      nav.setAttribute('role', 'navigation');

      if (!nav.getAttribute('aria-label')) nav.setAttribute('aria-label', 'Navegação principal');
    }
    main && main.setAttribute('role', 'main');
    footer && footer.setAttribute('role', 'contentinfo');
  }

  function enhanceDropdownMenu() {
    const dropdown = document.querySelector('.dropdown');
    if (!dropdown) return;

    const toggle = dropdown.querySelector('a'); 
    const submenu = dropdown.querySelector('.submenu');

    if (!toggle || !submenu) return;


    toggle.setAttribute('aria-haspopup', 'true');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('role', 'button');
    toggle.setAttribute('tabindex', '0');

    submenu.setAttribute('role', 'menu');
    Array.from(submenu.querySelectorAll('a')).forEach((a) => a.setAttribute('role', 'menuitem'));

   
    const openMenu = () => {
      submenu.dataset.open = 'true';
      toggle.setAttribute('aria-expanded', 'true');
    
      const first = submenu.querySelector('a');
      first && first.focus();
    };
    const closeMenu = () => {
      submenu.dataset.open = 'false';
      toggle.setAttribute('aria-expanded', 'false');
    };
    closeMenu(); 

   
    toggle.addEventListener('click', (e) => {
 
      e.preventDefault();
      const isOpen = submenu.dataset.open === 'true';
      isOpen ? closeMenu() : openMenu();
    });

    toggle.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault(); openMenu();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault(); openMenu();
      }
    });


    submenu.addEventListener('keydown', (e) => {
      const items = Array.from(submenu.querySelectorAll('a'));
      const idx = items.indexOf(document.activeElement);
      if (e.key === 'Escape') {
        e.preventDefault(); closeMenu(); toggle.focus();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        const next = items[(idx + 1) % items.length];
        next && next.focus();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        const prev = items[(idx - 1 + items.length) % items.length];
        prev && prev.focus();
      } else if (e.key === 'Tab') {

        if (!e.shiftKey && idx === items.length - 1) closeMenu();
        if (e.shiftKey && idx === 0) closeMenu();
      }
    });

  
    document.addEventListener('click', (e) => {
      const isInside = dropdown.contains(e.target);
      if (!isInside) closeMenu();
    });
  }

  function enhanceFormValidation() {
    const form = document.getElementById('cadastroForm');
    if (!form) return;

    const feedback = document.getElementById('form-feedback');
    if (feedback) {
      feedback.setAttribute('role', 'alert');
      feedback.setAttribute('aria-live', 'assertive');
    }


    const setInvalid = (el, msg) => {
      el.setAttribute('aria-invalid', 'true');
    
      let hintId = el.id ? `${el.id}-erro` : null;
      if (hintId) {
        let hint = document.getElementById(hintId);
        if (!hint) {
          hint = document.createElement('div');
          hint.id = hintId;
          hint.className = 'sr-only';
          el.insertAdjacentElement('afterend', hint);
        }
        hint.textContent = msg;
        const prev = el.getAttribute('aria-describedby');
        const list = new Set((prev ? prev.split(' ') : []).concat(hintId));
        el.setAttribute('aria-describedby', Array.from(list).join(' '));
      }
    };

    const clearInvalid = (el) => {
      el.removeAttribute('aria-invalid');
      const prev = el.getAttribute('aria-describedby');
      if (prev) {
        const ids = prev.split(' ').filter(id => !id.endsWith('-erro'));
        if (ids.length) el.setAttribute('aria-describedby', ids.join(' '));
        else el.removeAttribute('aria-describedby');
      }
    };

    
    form.addEventListener('input', (e) => {
      const t = e.target;
      if (!(t instanceof HTMLInputElement || t instanceof HTMLSelectElement)) return;
      if (t.checkValidity()) clearInvalid(t);
    });

    form.addEventListener('submit', (e) => {
      const invalids = Array.from(form.querySelectorAll('input, select, textarea')).filter(el => !el.checkValidity());
      if (invalids.length) {
        e.preventDefault();

        if (feedback) {
          feedback.style.display = '';
          feedback.textContent = 'Campos obrigatórios em branco ou inválidos. Por favor, corrija os campos marcados.';
        }

        invalids.forEach((el) => setInvalid(el, el.validationMessage || 'Campo inválido.'));
        invalids[0].focus();
      } else {

      }
    });
  }

  function enhanceModalA11y() {
    const modal = document.getElementById('successModal');
    if (!modal) return;

    const dialog = modal.querySelector('.modal-content') || modal.firstElementChild;
    const title = modal.querySelector('h2');
    const desc = modal.querySelector('p');
    const closeBtn = modal.querySelector('.close-button');

    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-hidden', 'true');

    if (title && !title.id) title.id = 'modal-title';
    if (desc && !desc.id) desc.id = 'modal-desc';
    if (title) modal.setAttribute('aria-labelledby', title.id);
    if (desc) modal.setAttribute('aria-describedby', desc.id);
    if (dialog) dialog.setAttribute('tabindex', '-1');

    let lastFocused = null;

    const focusableSelector = [
      'a[href]', 'button', 'input', 'select', 'textarea', '[tabindex]:not([tabindex="-1"])'
    ].join(',');

    const trapFocus = (e) => {
      const focusables = Array.from(modal.querySelectorAll(focusableSelector)).filter(isVisible);
      if (!focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.key === 'Tab') {
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault(); last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault(); first.focus();
        }
      } else if (e.key === 'Escape') {
        e.preventDefault(); closeModal();
      }
    };

    function openModal() {
      lastFocused = document.activeElement;
      modal.setAttribute('aria-hidden', 'false');
      setTimeout(() => (dialog && dialog.focus()), 0);
      document.addEventListener('keydown', trapFocus);
    }

    function closeModal() {
      modal.setAttribute('aria-hidden', 'true');
      document.removeEventListener('keydown', trapFocus);
      if (lastFocused && typeof lastFocused.focus === 'function') lastFocused.focus();
    }

    const observer = new MutationObserver(() => {
      const isVisible = getComputedStyle(modal).display !== 'none' && modal.getAttribute('aria-hidden') !== 'false';

      if (isVisible) openModal();
    });
    observer.observe(modal, { attributes: true, attributeFilter: ['style', 'class'] });

    closeBtn && closeBtn.addEventListener('click', closeModal);
    const btnSecondary = modal.querySelector('.btn.btn-secondary');
    btnSecondary && btnSecondary.addEventListener('click', closeModal);

    
    function isVisible(el) {
      return !!(el.offsetWidth || el.offsetHeight || el.getClientRects().length);
    }
  }

  function ensureNavAriaCurrent() {

    const links = document.querySelectorAll('nav a[href^="#"]');
    const hash = window.location.hash;
    links.forEach((a) => {
      if (!hash) return;
      if (a.getAttribute('href') === hash) a.setAttribute('aria-current', 'page');
      else a.removeAttribute('aria-current');
    });
    window.addEventListener('hashchange', ensureNavAriaCurrent);
  }
})();
