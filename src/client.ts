import '@fontsource-variable/archivo';
import '@fontsource/ibm-plex-mono/latin-400.css';
import '@fontsource/ibm-plex-mono/latin-600.css';
import './styles.css';
import './experience.css';
import { buildMailto } from './mailto.ts';

/* React stops at prerendering. These small controllers enhance the static
 * document only after their required markup and listeners are available. */

function initNavigation() {
  const header = document.querySelector<HTMLElement>('[data-site-header]');
  const menuToggle = header?.querySelector<HTMLButtonElement>('[data-menu-toggle]');
  const nav = header?.querySelector<HTMLElement>('[data-nav-links]');
  const dropdown = header?.querySelector<HTMLElement>('[data-dropdown]');
  const dropdownToggle = dropdown?.querySelector<HTMLButtonElement>('[data-dropdown-toggle]');
  if (!header || !menuToggle || !nav || !dropdown || !dropdownToggle) return;

  let menuOpen = false;
  let dropdownOpen = false;
  const mobile = window.matchMedia('(max-width: 1080px)');
  const hover = window.matchMedia('(hover: hover) and (pointer: fine)');

  const sync = () => {
    nav.classList.toggle('open', menuOpen);
    menuToggle.setAttribute('aria-expanded', String(menuOpen));
    menuToggle.setAttribute('aria-label', menuOpen ? 'Close navigation' : 'Open navigation');
    dropdown.classList.toggle('open', dropdownOpen);
    dropdownToggle.setAttribute('aria-expanded', String(dropdownOpen));
  };
  const closeMenu = () => {
    menuOpen = false;
    sync();
  };
  const closeDropdown = () => {
    dropdownOpen = false;
    sync();
  };

  menuToggle.addEventListener('click', () => {
    menuOpen = !menuOpen;
    if (menuOpen) dropdownOpen = false;
    sync();
  });
  dropdownToggle.addEventListener('click', () => {
    dropdownOpen = !dropdownOpen;
    sync();
  });
  dropdown.addEventListener('mouseenter', () => {
    if (!hover.matches) return;
    dropdownOpen = true;
    sync();
  });
  dropdown.addEventListener('mouseleave', () => {
    if (hover.matches && !dropdown.contains(document.activeElement)) closeDropdown();
  });
  dropdown.addEventListener('focusout', (event) => {
    if (!dropdown.contains(event.relatedTarget as Node | null)) closeDropdown();
  });
  nav.addEventListener('click', (event) => {
    if (!(event.target as Element).closest('a')) return;
    menuOpen = false;
    dropdownOpen = false;
    sync();
  });
  document.addEventListener('pointerdown', (event) => {
    if (header.contains(event.target as Node)) return;
    menuOpen = false;
    dropdownOpen = false;
    sync();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return;
    if (dropdownOpen) {
      closeDropdown();
      dropdownToggle.focus();
    } else if (menuOpen) {
      closeMenu();
      menuToggle.focus();
    }
  });
  mobile.addEventListener('change', () => {
    if (!mobile.matches) closeMenu();
  });

  sync();
  header.classList.add('nav-ready');
}

function initFilters() {
  document.querySelectorAll<HTMLElement>('[data-filter-grid]').forEach((grid) => {
    const toolbar = grid.previousElementSibling;
    if (!toolbar?.matches('[data-filter-toolbar]')) return;
    const buttons = Array.from(toolbar.querySelectorAll<HTMLButtonElement>('[data-filter-value]'));
    const cards = Array.from(grid.children) as HTMLElement[];
    const categoryAttr = grid.dataset.categoryAttr;
    const all = grid.dataset.allLabel ?? 'all';
    if (!categoryAttr || !buttons.length) return;

    buttons.forEach((button) => {
      button.addEventListener('click', () => {
        const selected = button.dataset.filterValue ?? all;
        buttons.forEach((item) => {
          const active = item === button;
          item.classList.toggle('active', active);
          item.setAttribute('aria-pressed', String(active));
        });
        cards.forEach((card) => {
          const categories = (card.getAttribute(categoryAttr) ?? '').split(/\s+/);
          card.hidden = selected !== all && !categories.includes(selected);
        });
      });
    });
    toolbar.classList.add('filter-ready');
  });
}

function initExplorers() {
  document.querySelectorAll<HTMLElement>('[data-explorer]').forEach((explorer) => {
    const index = explorer.querySelector<HTMLElement>('.explorer-index');
    const buttons = Array.from(explorer.querySelectorAll<HTMLButtonElement>('[data-explorer-target]'));
    const panels = Array.from(explorer.querySelectorAll<HTMLElement>('[data-explorer-panel]'));
    const filters = Array.from(explorer.querySelectorAll<HTMLButtonElement>('[data-filter-value]'));
    const categoryAttr = explorer.dataset.categoryAttr;
    const all = explorer.dataset.allLabel ?? 'all';
    if (!index || !categoryAttr || !buttons.length || !panels.length) return;

    const matches = (element: HTMLElement, filter: string) => {
      const categories = (element.getAttribute(categoryAttr) ?? '').split(/\s+/);
      return filter === all || categories.includes(filter);
    };
    const visibleButtons = () => buttons.filter((button) => !button.hidden);
    const select = (id: string, focus = false) => {
      const activeButton = buttons.find((button) => button.dataset.explorerTarget === id && !button.hidden);
      if (!activeButton) return;
      buttons.forEach((button) => {
        const active = button === activeButton;
        button.setAttribute('aria-selected', String(active));
        button.tabIndex = active ? 0 : -1;
      });
      panels.forEach((panel) => {
        const active = panel.id === id;
        panel.classList.toggle('is-active', active);
        panel.hidden = !active;
      });
      if (focus) {
        activeButton.focus();
        activeButton.scrollIntoView({ block: 'nearest', inline: 'nearest' });
      }
    };
    const applyFilter = (filter: string, source: HTMLButtonElement) => {
      filters.forEach((button) => {
        const active = button === source;
        button.classList.toggle('active', active);
        button.setAttribute('aria-pressed', String(active));
      });
      buttons.forEach((button) => { button.hidden = !matches(button, filter); });
      panels.forEach((panel) => { panel.hidden = !matches(panel, filter); });
      const selected = buttons.find((button) => button.getAttribute('aria-selected') === 'true' && !button.hidden);
      const next = selected ?? visibleButtons()[0];
      if (next) select(next.dataset.explorerTarget ?? '');
    };

    buttons.forEach((button) => {
      button.addEventListener('click', () => select(button.dataset.explorerTarget ?? ''));
    });
    filters.forEach((button) => {
      button.addEventListener('click', () => applyFilter(button.dataset.filterValue ?? all, button));
    });
    index.addEventListener('keydown', (event) => {
      if (!['ArrowRight', 'ArrowDown', 'ArrowLeft', 'ArrowUp', 'Home', 'End'].includes(event.key)) return;
      event.preventDefault();
      const available = visibleButtons();
      const current = available.indexOf(document.activeElement as HTMLButtonElement);
      let next = current < 0 ? 0 : current;
      if (event.key === 'Home') next = 0;
      else if (event.key === 'End') next = available.length - 1;
      else if (event.key === 'ArrowRight' || event.key === 'ArrowDown') next = (next + 1) % available.length;
      else next = (next - 1 + available.length) % available.length;
      const target = available[next];
      if (target) select(target.dataset.explorerTarget ?? '', true);
    });

    const openHash = () => {
      const id = decodeURIComponent(window.location.hash.slice(1));
      if (panels.some((panel) => panel.id === id)) select(id);
    };
    window.addEventListener('hashchange', openHash);
    select(buttons[0].dataset.explorerTarget ?? '');
    openHash();
    explorer.classList.add('explorer-ready');
  });
}

function initObservationModels() {
  const group = document.querySelector<HTMLElement>('[data-observation-models]');
  const models = Array.from(group?.querySelectorAll<HTMLDetailsElement>('.observation-model') ?? []);
  if (!models.length) return;
  const sync = () => {
    const active = models.findIndex((model) => model.open);
    if (active < 0) delete document.body.dataset.observationModel;
    else document.body.dataset.observationModel = String(active);
  };
  models.forEach((model, index) => {
    model.addEventListener('toggle', () => {
      if (model.open) {
        models.forEach((other) => { if (other !== model) other.open = false; });
        document.body.dataset.observationModel = String(index);
      } else {
        sync();
      }
    });
  });
  sync();
}

function initDisclosureGroups() {
  document.querySelectorAll<HTMLElement>('[data-disclosure-group]').forEach((group) => {
    const records = Array.from(group.querySelectorAll<HTMLDetailsElement>(':scope > details'));
    records.forEach((record) => {
      record.addEventListener('toggle', () => {
        if (!record.open) return;
        records.forEach((other) => { if (other !== record) other.open = false; });
      });
    });
  });
}

function initQuestionExplorer() {
  const table = document.querySelector<HTMLTableElement>('[data-question-table]');
  const diagram = document.querySelector<HTMLElement>('[data-decision-chain]');
  const links = Array.from(table?.querySelectorAll<HTMLAnchorElement>('[data-question-select]') ?? []);
  if (!table || !diagram || !links.length) return;
  links.forEach((link, index) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      table.querySelectorAll('tbody tr').forEach((row, rowIndex) => {
        row.classList.toggle('is-selected', rowIndex === index);
      });
      diagram.dataset.selected = String(index);
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      diagram.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'nearest' });
    });
  });
}

function initEventFlows() {
  document.querySelectorAll<HTMLElement>('[data-event-flow]').forEach((flow) => {
    const steps = Array.from(flow.querySelectorAll<HTMLAnchorElement>('[data-flow-step]'));
    const response = document.querySelector<HTMLElement>('[data-event-response]');
    steps.forEach((step, index) => {
      step.addEventListener('click', () => {
        steps.forEach((item) => item.classList.toggle('is-selected', item === step));
        if (response) response.dataset.step = String(index);
      });
    });
  });
}

function initSearch() {
  const input = document.querySelector<HTMLInputElement>('[data-search-input]');
  const list = input?.parentElement?.querySelector<HTMLElement>('[data-search-list]');
  if (!input || !list) return;
  const items = Array.from(list.children) as HTMLElement[];

  input.addEventListener('input', () => {
    const query = input.value.trim().toLocaleLowerCase();
    items.forEach((item) => {
      item.hidden = Boolean(query) && !(item.textContent ?? '').toLocaleLowerCase().includes(query);
    });
  });
  input.classList.add('search-ready');
}

function initContact() {
  const form = document.querySelector<HTMLFormElement>('[data-contact-form]');
  form?.addEventListener('submit', (event) => {
    event.preventDefault();
    window.location.href = buildMailto(new FormData(form));
  });
}

initNavigation();
initDisclosureGroups();
switch (document.body.dataset.page) {
  case 'technology':
    initObservationModels();
    break;
  case 'applications':
  case 'careers':
    initExplorers();
    break;
  case 'defence':
    initQuestionExplorer();
    break;
  case 'civil':
    initEventFlows();
    break;
  case 'company':
    initSearch();
    break;
  case 'contact':
    initContact();
    break;
}
