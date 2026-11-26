/* A buildless, progressively enhanced GitHub Pages website. */
(() => {
  'use strict';
  const root = document.documentElement;
  const menu = document.querySelector('.menu-toggle');
  const navigation = document.querySelector('#navigation');
  if (menu && navigation) {
    root.classList.add('js');
    menu.hidden = false;
    const closeMenu = () => {
      navigation.classList.remove('is-open');
      menu.setAttribute('aria-expanded', 'false');
    };
    menu.addEventListener('click', () => {
      const open = menu.getAttribute('aria-expanded') !== 'true';
      navigation.classList.toggle('is-open', open);
      menu.setAttribute('aria-expanded', String(open));
    });
    navigation.addEventListener('click', (event) => {
      if (event.target.closest('a')) closeMenu();
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') {
        closeMenu(); menu.focus();
      }
    });
    document.addEventListener('click', (event) => {
      if (!event.target.closest('.site-header')) closeMenu();
    });
    const desktop = matchMedia('(min-width: 621px)');
    desktop.addEventListener('change', closeMenu);
  }
  const year = document.querySelector('#year');
  if (year) year.textContent = new Date().getFullYear();
  const projects = {
    pntze: {
      title: 'PNTZE', status: 'Ongoing · Product design & prototyping',
      lead: 'A guided mobile experience that makes a personal journey feel approachable and engaging.',
      scope: ['Interpreting the product documentation into a clear user journey.', 'Exploring a shared interface, onboarding and daily experience.', 'Developing UI directions and planning a native mobile prototype.'],
      note: 'The interface and prototype work are ongoing. This overview is not a release announcement or a public product demo.'
    },
    scndz: {
      title: 'SCNDZ', status: 'Ongoing · Design & frontend development',
      lead: 'Vehicle acquisition software designed to bring structure to capturing information, following up and reviewing an assessment.',
      scope: ['Account creation, onboarding and organization setup.', 'Acquisition capture, identity information, notes and follow-up interfaces.', 'Results, assessment and outcome-tracking frontend flows.'],
      note: 'Frontend implementation is ongoing. Some behavior uses local or simulated data; backend integration and newer design changes remain in progress.'
    },
    cfs: {
      title: 'Creator Finder (CFS)', status: 'In design · Wireframes & user flows',
      lead: 'A connected workflow for discovering creators, reviewing evidence and developing partnerships.',
      scope: ['Campaign setup, discovery and creator research.', 'Outreach, replies, opportunities and partnership workflows.', 'Low-fidelity wireframes, flowcharts and alignment with the product specification.'],
      note: 'The current work is at the design and specification-review stage. Wireframes are static design artifacts, not a released application.'
    }
  };
  const dialog = document.querySelector('#project-dialog');
  const content = document.querySelector('#dialog-content');
  if (!dialog || !content || typeof dialog.showModal !== 'function') return;
  let previousFocus;
  document.querySelectorAll('[data-project]').forEach(link => {
    link.addEventListener('click', event => {
      const project = projects[link.dataset.project];
      if (!project) return;
      event.preventDefault();
      previousFocus = link;
      // Content comes exclusively from the static project definitions above.
      content.replaceChildren();
      const add = (tag, text, className) => {
        const element = document.createElement(tag);
        element.textContent = text;
        if (className) element.className = className;
        content.append(element);
        return element;
      };
      add('p', project.status, 'dialog-status');
      add('h2', project.title).id = 'dialog-title';
      add('p', project.lead, 'dialog-lead');
      add('h3', 'Our current focus');
      const list = document.createElement('ul');
      project.scope.forEach(text => {
        const item = document.createElement('li');
        item.textContent = text; list.append(item);
      });
      content.append(list);
      add('p', project.note, 'dialog-note');
      const contact = add('a', 'Talk about a similar project', 'button');
      contact.href = '#contact';
      contact.addEventListener('click', () => dialog.close());
      dialog.showModal();
      document.body.classList.add('modal-open');
    });
  });
  dialog.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const rect = dialog.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
  });
  dialog.addEventListener('keydown', event => {
    if (event.key !== 'Tab') return;
    const items = [...dialog.querySelectorAll('button, a[href]')];
    const first = items[0];
    const last = items[items.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault(); last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault(); first.focus();
    }
  });
  dialog.addEventListener('close', () => {
    document.body.classList.remove('modal-open');
    previousFocus?.focus({preventScroll: true});
  });
})();
