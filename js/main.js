/* ============================================================
   JAMILI CARPETS — Main JavaScript
   Handles: navigation, scroll effects, data loading,
   content injection, scroll reveal, forms, footer, header
   ============================================================ */

(function () {
  'use strict';

  /* ===== DATA CACHE ===== */
  var cache = {
    settings: null,
    home: null,
    about: null,
    services: null,
    contact: null,
    faq: null,
    products: null
  };

  /* ===== HELPER: escape HTML ===== */
  function esc(str) {
    if (str == null) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  /* ===== LOAD DATA FROM SUPABASE ===== */
  function loadTable(name) {
    return window.SupabaseClient.getClient().then(function (client) {
      return client.from(name).select('*').limit(1).then(function (res) {
        if (res.error) throw res.error;
        return res.data && res.data[0] ? res.data[0] : null;
      });
    });
  }

  function loadAll() {
    return Promise.all([
      loadTable('site_settings').then(function (d) { cache.settings = d; }),
      loadTable('home_content').then(function (d) { cache.home = d; }),
      loadTable('about_content').then(function (d) { cache.about = d; }),
      loadTable('services_content').then(function (d) { cache.services = d; }),
      loadTable('contact_content').then(function (d) { cache.contact = d; })
    ]);
  }

  function loadFAQ() {
    return window.SupabaseClient.getClient().then(function (client) {
      return client.from('faq_content').select('*').eq('is_active', true).order('display_order').then(function (res) {
        if (res.error) throw res.error;
        cache.faq = res.data || [];
      });
    });
  }

  function loadProducts() {
    return window.SupabaseClient.getClient().then(function (client) {
      return client.from('products').select('*').eq('is_active', true).order('display_order').then(function (res) {
        if (res.error) throw res.error;
        cache.products = res.data || [];
      });
    });
  }

  /* ===== ICONS (original SVG paths) ===== */
  var icons = {
    phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>',
    mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>',
    location: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>',
    clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
    whatsapp: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>',
    instagram: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>',
    facebook: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>',
    hand: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0"/><path d="M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v2"/><path d="M10 10.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v8"/><path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"/></svg>',
    gem: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="6 3 18 3 22 9 12 22 2 9"/><path d="M11 3L8 9l4 13 4-13-3-6"/><line x1="2" y1="9" x2="22" y2="9"/></svg>',
    palette: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="13.5" cy="6.3" r="2.3"/><circle cx="17.5" cy="10.5" r="2.3"/><circle cx="8.5" cy="7.8" r="2.3"/><circle cx="6.5" cy="12.8" r="2.3"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.563-2.512 5.563-5.563C21.999 6.012 17.522 2 12 2z"/></svg>',
    globe: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>',
    shield: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
    star: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>',
    handshake: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-3-3"/><path d="M4 12v7a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7"/><path d="m2 7 4-4 4 4"/><path d="m14 7 4-4 4 4"/></svg>',
    leaf: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19.2 2.96c1.4 9.3-4.1 15.56-8.2 17.04Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6"/></svg>',
    'paint-brush': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18.37 2.63 14 7l-1.59-1.59a2 2 0 0 0-2.82 0L8 7l9 9 1.59-1.59a2 2 0 0 0 0-2.82L17 10l4.37-4.37a2.12 2.12 0 1 0-3-3z"/><path d="M9 8c-2 3-4 3.5-7 4l8 10a5 5 0 0 0 7-7c-3-1-4-2-4-4"/></svg>',
    droplet: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z"/></svg>',
    wrench: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>',
    clipboard: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/></svg>',
    home: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>',
    spray: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 3h-3a2 2 0 0 0-2 2v0a2 2 0 0 0 2 2h3a2 2 0 0 0 2-2v0a2 2 0 0 0-2-2z"/><path d="M12 8v12a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2V8"/><path d="M20 12h2"/><path d="M20 16h2"/><path d="M20 20h2"/><path d="M8 14h.01"/><path d="M8 18h.01"/><path d="M8 10h.01"/></svg>',
    briefcase: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>',
    chevron: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>',
    'chevron-down': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>',
    arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>'
  };

  window.JC = {
    cache: cache,
    icons: icons,
    esc: esc,
    loadAll: loadAll,
    loadFAQ: loadFAQ,
    loadProducts: loadProducts,
    loadTable: loadTable
  };

  /* ===== HEADER ===== */
  function renderHeader() {
    var s = cache.settings || {};
    var logoUrl = s.logo_url || '';
    var companyName = s.company_name || 'JAMILI CARPETS';
    var currentPage = (document.body.getAttribute('data-page') || '').toLowerCase();

    var navLinks = [
      { href: 'index.html', label: 'Home', page: 'home' },
      { href: 'about.html', label: 'About', page: 'about' },
      { href: 'products.html', label: 'Products', page: 'products' },
      { href: 'services.html', label: 'Services', page: 'services' },
      { href: 'faq.html', label: 'FAQ', page: 'faq' },
      { href: 'contact.html', label: 'Contact', page: 'contact' }
    ];

    var navHtml = navLinks.map(function (l) {
      var cls = 'nav-link' + (currentPage === l.page ? ' active' : '');
      return '<a href="' + l.href + '" class="' + cls + '">' + l.label + '</a>';
    }).join('');

    var headerEl = document.getElementById('site-header');
    if (headerEl) {
      headerEl.innerHTML =
        '<div class="navbar">' +
                    '<a href="index.html" class="nav-logo">' +
            (logoUrl ? '<img src="' + esc(logoUrl) + '" alt="' + esc(companyName) + '">' : '') +
            '<span style="font-family:Playfair Display,serif;font-size:1.4rem;color:#C99A47;font-weight:700;letter-spacing:1px;">' + esc(companyName) + '</span>' +
          '</a>' +

          '<nav class="nav-menu" id="nav-menu">' +
            navHtml +
            '<a href="' + esc(s.whatsapp || '#') + '" class="nav-cta btn btn-primary" target="_blank" rel="noopener">Enquire Now</a>' +
          '</nav>' +
          '<button class="nav-toggle" id="nav-toggle" aria-label="Toggle menu"><span></span><span></span><span></span></button>' +
        '</div>';
    }

    // Mobile toggle
    var toggle = document.getElementById('nav-toggle');
    var menu = document.getElementById('nav-menu');
    if (toggle && menu) {
      toggle.addEventListener('click', function () {
        toggle.classList.toggle('active');
        menu.classList.toggle('active');
      });
      // Close menu on link click
      menu.querySelectorAll('a').forEach(function (a) {
        a.addEventListener('click', function () {
          toggle.classList.remove('active');
          menu.classList.remove('active');
        });
      });
    }

    // Scroll effect
    window.addEventListener('scroll', function () {
      if (window.scrollY > 50) {
        headerEl.classList.add('scrolled');
      } else {
        headerEl.classList.remove('scrolled');
      }
    });
  }

  /* ===== FOOTER ===== */
  function renderFooter() {
    var s = cache.settings || {};
    var footerEl = document.getElementById('site-footer');
    if (!footerEl) return;

    var year = new Date().getFullYear();

    footerEl.innerHTML =
      '<div class="container">' +
        '<div class="footer-grid">' +
          '<div class="footer-brand">' +
            (s.logo_url ? '<img src="' + esc(s.logo_url) + '" alt="' + esc(s.company_name || 'JAMILI CARPETS') + '">' : '<h3 style="color:#C99A47;font-family:Playfair Display,serif;">JAMILI CARPETS</h3>') +
            '<p>Handcrafted Afghan carpets since 1980. From the heart of Kabul to homes worldwide, we bring you the finest handmade carpets woven with tradition, artistry, and passion.</p>' +
            '<div class="footer-social">' +
              '<a href="' + esc(s.whatsapp || '#') + '" target="_blank" rel="noopener" aria-label="WhatsApp">' + icons.whatsapp + '</a>' +
              '<a href="' + esc(s.instagram || '#') + '" target="_blank" rel="noopener" aria-label="Instagram">' + icons.instagram + '</a>' +
              '<a href="' + esc(s.facebook || '#') + '" target="_blank" rel="noopener" aria-label="Facebook">' + icons.facebook + '</a>' +
            '</div>' +
          '</div>' +
          '<div class="footer-col">' +
            '<h4>Quick Links</h4>' +
            '<ul>' +
              '<li><a href="index.html">Home</a></li>' +
              '<li><a href="about.html">About</a></li>' +
              '<li><a href="products.html">Products</a></li>' +
              '<li><a href="services.html">Services</a></li>' +
              '<li><a href="faq.html">FAQ</a></li>' +
              '<li><a href="contact.html">Contact</a></li>' +
            '</ul>' +
          '</div>' +
          '<div class="footer-col">' +
            '<h4>Our Products</h4>' +
            '<ul>' +
              '<li><a href="products.html">Handmade Carpets</a></li>' +
              '<li><a href="products.html">Silk Carpets</a></li>' +
              '<li><a href="products.html">Wool Carpets</a></li>' +
              '<li><a href="products.html">Tribal Rugs</a></li>' +
              '<li><a href="products.html">Prayer Rugs</a></li>' +
              '<li><a href="products.html">Kilims</a></li>' +
            '</ul>' +
          '</div>' +
          '<div class="footer-col">' +
            '<h4>Contact Us</h4>' +
            '<div class="footer-contact-item">' + icons.location + '<span>' + esc(s.address || '') + '</span></div>' +
            '<div class="footer-contact-item">' + icons.phone + '<a href="tel:' + esc(s.phone || '') + '">' + esc(s.phone || '') + '</a></div>' +
            '<div class="footer-contact-item">' + icons.mail + '<a href="mailto:' + esc(s.email || '') + '">' + esc(s.email || '') + '</a></div>' +
            '<div class="footer-contact-item">' + icons.clock + '<span>' + esc(s.opening_hours || '') + '</span></div>' +
          '</div>' +
        '</div>' +
      '</div>' +
      '<div class="footer-bottom">' +
        '<div class="container">' +
          '<p>&copy; ' + year + ' ' + esc(s.company_name || 'JAMILI CARPETS') + '. All rights reserved. | Handcrafted in Kabul, Afghanistan.</p>' +
        '</div>' +
      '</div>';
  }

  /* ===== WHATSAPP FLOAT ===== */
  function renderWhatsAppFloat() {
    var s = cache.settings || {};
    var existing = document.getElementById('whatsapp-float');
    if (existing) return;
    var el = document.createElement('a');
    el.id = 'whatsapp-float';
    el.className = 'whatsapp-float';
    el.href = s.whatsapp || 'https://wa.me/+93777697777';
    el.target = '_blank';
    el.rel = 'noopener';
    el.setAttribute('aria-label', 'Chat on WhatsApp');
    el.innerHTML = icons.whatsapp;
    document.body.appendChild(el);
  }

  /* ===== SCROLL REVEAL ===== */
  function initScrollReveal() {
    var elements = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window)) {
      elements.forEach(function (el) { el.classList.add('visible'); });
      return;
    }
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    elements.forEach(function (el) { observer.observe(el); });
  }

  /* ===== CONTACT FORM ===== */
  function initContactForm() {
    var form = document.getElementById('contact-form');
    if (!form) return;
    var msg = document.getElementById('form-message');

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = form.querySelector('[name="name"]').value.trim();
      var email = form.querySelector('[name="email"]').value.trim();
      var message = form.querySelector('[name="message"]').value.trim();

      if (!name || !email || !message) {
        if (msg) {
          msg.className = 'form-message error';
          msg.textContent = 'Please fill in all required fields.';
        }
        return;
      }

      var submitBtn = form.querySelector('button[type="submit"]');
      if (submitBtn) submitBtn.disabled = true;

      window.SupabaseClient.getClient().then(function (client) {
        var phone = form.querySelector('[name="phone"]') ? form.querySelector('[name="phone"]').value.trim() : '';
        var subject = form.querySelector('[name="subject"]') ? form.querySelector('[name="subject"]').value.trim() : '';
        return client.from('contact_messages').insert({
          name: name,
          email: email,
          phone: phone,
          subject: subject,
          message: message
        });
      }).then(function () {
        if (msg) {
          msg.className = 'form-message success';
          msg.textContent = 'Thank you! Your message has been sent. We will get back to you soon.';
        }
        form.reset();
      }).catch(function () {
        if (msg) {
          msg.className = 'form-message error';
          msg.textContent = 'Sorry, there was an error sending your message. Please try again or contact us via WhatsApp.';
        }
      }).then(function () {
        if (submitBtn) submitBtn.disabled = false;
      });
    });
  }

  /* ===== INIT ===== */
  function init() {
    // Load all data first, then render
    var configured = window.SupabaseClient && window.SupabaseClient.isConfigured();

    if (!configured) {
      console.warn('Supabase not configured. Using placeholder data. Edit js/config.js to enable live data.');
      // Still render header/footer with defaults
      renderHeader();
      renderFooter();
      renderWhatsAppFloat();
      initScrollReveal();
      initContactForm();
      // Show config notice
      var notice = document.getElementById('config-notice');
      if (notice) notice.style.display = 'block';
      return;
    }

    loadAll().then(function () {
      renderHeader();
      renderFooter();
      renderWhatsAppFloat();
      // Render page-specific content
      var page = document.body.getAttribute('data-page');
      if (page === 'home' && window.renderHome) window.renderHome();
      if (page === 'about' && window.renderAbout) window.renderAbout();
      if (page === 'services' && window.renderServices) window.renderServices();
      if (page === 'contact' && window.renderContact) window.renderContact();
      if (page === 'faq') return loadFAQ().then(function () { if (window.renderFAQ) window.renderFAQ(); });
      if (page === 'products') return loadProducts().then(function () { if (window.renderProducts) window.renderProducts(); });
    }).catch(function (err) {
      console.error('Error loading data:', err);
      renderHeader();
      renderFooter();
      renderWhatsAppFloat();
    }).then(function () {
      initScrollReveal();
      initContactForm();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
