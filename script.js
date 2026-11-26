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

/* Inquiry delivery uses a hosted form endpoint; no server or credentials are shipped. */
(() => {
  'use strict';
  const form = document.querySelector('#inquiry-form');
  if (!form) return;
  const feedback = document.querySelector('#inquiry-feedback');
  const submit = form.querySelector('button[type="submit"]');
  const fields = {
    name: form.elements.namedItem('name'),
    email: form.elements.namedItem('email'),
    service: form.elements.namedItem('service'),
    message: form.elements.namedItem('message'),
    consent: form.elements.namedItem('consent')
  };
  let sending = false;
  const errorFor = (name) => {
    const field = fields[name];
    if (name === 'consent') return field.checked ? '' : 'Please agree to the website terms and acknowledge the privacy notice.';
    const value = field.value.trim();
    if (field.maxLength > 0 && value.length > field.maxLength) return 'Please shorten this field to the stated limit.';
    if (!value) return {name:'Enter your name.',email:'Enter your email address.',service:'Choose the support you need.',message:'Tell us a little about your project.'}[name];
    if (name === 'email' && !field.validity.valid) return 'Enter a valid email address, such as name@example.com.';
    if (name === 'message' && value.length < 20) return 'Add a little more detail (at least 20 characters).';
    return '';
  };
  const showFieldError = (name, message) => {
    const target = document.querySelector(`#${name}-error`);
    target.textContent = message;
    if (message) fields[name].setAttribute('aria-invalid', 'true');
    else fields[name].removeAttribute('aria-invalid');
  };
  const showFeedback = (state, message) => {
    feedback.replaceChildren(document.createTextNode(message));
    feedback.dataset.state = state;
    feedback.hidden = false;
    feedback.focus();
  };
  Object.entries(fields).forEach(([name, field]) => {
    field.addEventListener('input', () => {
      if (field.hasAttribute('aria-invalid')) showFieldError(name, errorFor(name));
    });
    field.addEventListener('change', () => {
      if (field.hasAttribute('aria-invalid')) showFieldError(name, errorFor(name));
    });
  });
  document.querySelectorAll('[data-inquiry-service]').forEach(button => {
    button.addEventListener('click', () => {
      fields.service.value = button.dataset.inquiryService;
      showFieldError('service', '');
      document.querySelector('#contact').scrollIntoView({behavior:'instant'});
      fields.name.focus({preventScroll: true});
    });
  });
  // The normal HTML POST is the fallback when fetch or FormData is unavailable.
  if (!window.fetch || !window.FormData || !window.AbortController) return;
  form.noValidate = true;
  form.addEventListener('submit', async event => {
    event.preventDefault();
    if (sending) return;
    const errors = Object.keys(fields).map(name => ({name,message:errorFor(name)}));
    errors.forEach(({name,message}) => showFieldError(name,message));
    const invalid = errors.filter(({message}) => message);
    if (invalid.length) {
      showFeedback('error', 'Please check the following fields before sending:');
      const list = document.createElement('ul');
      invalid.forEach(({name,message}) => {
        const item = document.createElement('li');
        const link = document.createElement('a');
        link.href = `#${fields[name].id}`;
        link.textContent = message;
        link.addEventListener('click', e => {e.preventDefault();fields[name].focus();});
        item.append(link);list.append(item);
      });
      feedback.append(list);
      return;
    }
    if (form.elements.namedItem('_honey').value) {
      showFeedback('error', 'This request could not be processed. Please use the email link to contact us.');
      return;
    }
    // Allowlist fields; never accept extra delivery controls injected into the DOM.
    const data = {
      name:fields.name.value.trim(),email:fields.email.value.trim(),
      company:form.elements.namedItem('company').value.trim().slice(0,150),
      service:fields.service.value,message:fields.message.value.trim(),
      consent:'accepted',terms_version:'2026-11-26',
      _cc:'jay.sterling@globalsoftwarestudios.com',_subject:'New project inquiry — Global Software Solution',
      _template:'table',_honey:'',_replyto:fields.email.value.trim(),
      _url:location.origin + location.pathname
    };
    sending = true;
    submit.disabled = true;
    submit.textContent = 'Sending inquiry…';
    form.setAttribute('aria-busy', 'true');
    feedback.hidden = true;
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 20000);
    try {
      const response = await fetch('https://formsubmit.co/ajax/knightndgale@gmail.com', {
        method:'POST',credentials:'omit',cache:'no-store',redirect:'error',referrerPolicy:'no-referrer',
        headers:{'Content-Type':'application/json','Accept':'application/json'},
        body:JSON.stringify(data),signal:controller.signal
      });
      const result = await response.json();
      if (/activat|confirm your email|check your email/i.test(result.message || '')) {
        showFeedback('error', 'Email delivery is awaiting a one-time activation by the studio. Your message is still here. Please use “Email both of us” above to send it now.');
        return;
      }
      if (!response.ok || (result.success !== true && result.success !== 'true')) throw new Error('service');
      form.reset();
      showFeedback('success', 'Thank you. Your inquiry has been accepted by our email service for Mark and Jay. We’ll reply to the email address you provided.');
    } catch (error) {
      showFeedback('error', error.name === 'AbortError'
        ? 'The email service took too long to respond, so delivery could not be confirmed. Your details are still here. Please email both of us directly, or try again later.'
        : 'We couldn’t confirm that your inquiry was sent. Your details are still here. Please check your connection and try again, or use “Email both of us” above.');
    } finally {
      clearTimeout(timeout);
      sending = false;
      submit.disabled = false;
      submit.textContent = 'Send inquiry';
      form.removeAttribute('aria-busy');
    }
  });
})();
