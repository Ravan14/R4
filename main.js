(() => {
  const header = document.querySelector('.site-header');
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  const dropdownButton = document.querySelector('.nav-dropdown > button');
  const dropdown = document.querySelector('.nav-dropdown');
  const backToTop = document.querySelector('.back-to-top');

  const updateHeader = () => {
    const scrolled = window.scrollY > 24;
    header?.classList.toggle('scrolled', scrolled);
    backToTop?.classList.toggle('show', window.scrollY > 650);
  };
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  menuToggle?.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(open));
  });

  dropdownButton?.addEventListener('click', (event) => {
    event.preventDefault();
    const open = dropdown.classList.toggle('open');
    dropdownButton.setAttribute('aria-expanded', String(open));
  });

  document.addEventListener('click', (event) => {
    if (dropdown && !dropdown.contains(event.target)) {
      dropdown.classList.remove('open');
      dropdownButton?.setAttribute('aria-expanded', 'false');
    }
  });

  navLinks?.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      menuToggle?.setAttribute('aria-expanded', 'false');
    });
  });

  backToTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));

  const current = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  document.querySelectorAll('[data-page-link]').forEach((link) => {
    const target = (link.getAttribute('href') || '').split('#')[0].toLowerCase();
    if (target === current) link.classList.add('active');
  });

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  document.querySelectorAll('[data-counter]').forEach((counter) => {
    if (reduceMotion) return;
    const counterObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const target = Number(counter.dataset.counter || 0);
        const suffix = counter.dataset.suffix || '';
        const start = performance.now();
        const duration = 1000;
        const frame = (now) => {
          const progress = Math.min((now - start) / duration, 1);
          counter.textContent = `${Math.round(target * progress)}${suffix}`;
          if (progress < 1) requestAnimationFrame(frame);
        };
        requestAnimationFrame(frame);
        obs.unobserve(counter);
      });
    }, { threshold: 0.55 });
    counterObserver.observe(counter);
  });

  const filters = document.querySelectorAll('[data-application-filter]');
  const applicationCards = document.querySelectorAll('.application-card');
  filters.forEach((button) => {
    button.addEventListener('click', () => {
      const category = button.dataset.applicationFilter;
      filters.forEach((item) => item.classList.remove('active'));
      button.classList.add('active');
      applicationCards.forEach((card) => {
        const categories = (card.dataset.category || '').split(' ');
        card.hidden = category !== 'all' && !categories.includes(category);
      });
    });
  });

  const careerFilters = document.querySelectorAll('[data-career-filter]');
  const careerCards = document.querySelectorAll('[data-career-category]');
  careerFilters.forEach((button) => {
    button.addEventListener('click', () => {
      const category = button.dataset.careerFilter;
      careerFilters.forEach((item) => item.classList.remove('active'));
      button.classList.add('active');
      careerCards.forEach((card) => {
        card.hidden = category !== 'all' && card.dataset.careerCategory !== category;
      });
    });
  });

  const faqSearch = document.querySelector('#faqSearch');
  faqSearch?.addEventListener('input', () => {
    const query = faqSearch.value.trim().toLowerCase();
    document.querySelectorAll('.faq-list details').forEach((item) => {
      item.hidden = query && !item.textContent.toLowerCase().includes(query);
    });
  });

  const contactForm = document.querySelector('#contactForm');
  contactForm?.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = new FormData(contactForm);
    const subject = encodeURIComponent(data.get('subject') || 'R4 Website Enquiry');
    const body = encodeURIComponent(
      `Name: ${data.get('name') || ''}\nOrganisation: ${data.get('organisation') || ''}\nEmail: ${data.get('email') || ''}\nApplication domain: ${data.get('domain') || ''}\n\n${data.get('message') || ''}`
    );
    location.href = `mailto:info@r4space.com?subject=${subject}&body=${body}`;
  });
})();
