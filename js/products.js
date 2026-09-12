/* ============================================================
   JAMILI CARPETS — Products & Page Renderers
   Handles rendering for: home, about, services, faq, contact,
   and products pages with modal functionality.
   ============================================================ */

(function () {
  'use strict';

  var icons = window.JC ? window.JC.icons : {};
  var esc = window.JC ? window.JC.esc : function (s) { return s; };

  /* ===== HOME PAGE ===== */
  window.renderHome = function () {
    var s = window.JC.cache.settings || {};
    var h = window.JC.cache.home || {};

    // Hero
    var heroEl = document.getElementById('hero');
    if (heroEl) {
      var mediaHtml = '';
      if (s.hero_type === 'video' && s.hero_url) {
        mediaHtml = '<video autoplay muted loop playsinline><source src="' + esc(s.hero_url) + '" type="video/mp4"></video>';
      } else {
        mediaHtml = '<img src="' + esc(s.hero_url || '') + '" alt="Jamili Carpets" loading="eager">';
      }
      heroEl.innerHTML =
        '<div class="hero-bg">' + mediaHtml + '</div>' +
        '<div class="hero-overlay"></div>' +
        '<div class="hero-content">' +
          '<h1>' + esc(h.hero_title || s.hero_title || 'Handcrafted Afghan Carpets Since 1980') + '</h1>' +
          '<p>' + esc(h.hero_subtitle || s.hero_subtitle || '') + '</p>' +
          '<div class="hero-buttons">' +
            '<a href="products.html" class="btn btn-primary btn-lg">' + esc(s.hero_button_text || 'Explore Our Collection') + '</a>' +
            '<a href="' + esc(s.whatsapp || '#') + '" class="btn btn-outline btn-lg" target="_blank" rel="noopener">Enquire via WhatsApp</a>' +
          '</div>' +
        '</div>' +
        '<div class="hero-scroll"><span>Scroll Down</span>' + icons['chevron-down'] + '</div>';
    }

    // Features
    var featuresEl = document.getElementById('home-features');
    if (featuresEl) {
      var features = [
        { icon: h.feature1_icon || 'hand', title: h.feature1_title || 'Authentic Handmade', text: h.feature1_text || '' },
        { icon: h.feature2_icon || 'gem', title: h.feature2_title || 'Premium Materials', text: h.feature2_text || '' },
        { icon: h.feature3_icon || 'palette', title: h.feature3_title || 'Natural Dyes', text: h.feature3_text || '' },
        { icon: h.feature4_icon || 'globe', title: h.feature4_title || 'Global Shipping', text: h.feature4_text || '' }
      ];
      featuresEl.innerHTML = features.map(function (f) {
        return '<div class="feature-card reveal">' +
          '<div class="feature-icon">' + (icons[f.icon] || icons.hand) + '</div>' +
          '<h3>' + esc(f.title) + '</h3>' +
          '<p>' + esc(f.text) + '</p>' +
        '</div>';
      }).join('');
    }

    // Content block 1
    var block1El = document.getElementById('home-block1');
    if (block1El) {
      block1El.innerHTML =
        '<div class="content-block">' +
          '<div class="content-block-image reveal"><img src="' + esc(h.section1_image || '') + '" alt="' + esc(h.section1_title || '') + '" loading="lazy"></div>' +
          '<div class="content-block-text reveal">' +
            '<h2>' + esc(h.section1_title || '') + '</h2>' +
            '<p>' + esc(h.section1_text || '') + '</p>' +
            '<a href="about.html" class="btn btn-outline">Learn More About Us</a>' +
          '</div>' +
        '</div>';
    }

    // Stats
    var statsEl = document.getElementById('home-stats');
    if (statsEl) {
      statsEl.innerHTML =
        '<div class="stats-grid">' +
          '<div class="stat-item reveal"><h3>' + esc(h.stats1_number || '44+') + '</h3><p>' + esc(h.stats1_label || 'Years of Experience') + '</p></div>' +
          '<div class="stat-item reveal"><h3>' + esc(h.stats2_number || '10000+') + '</h3><p>' + esc(h.stats2_label || 'Carpets Woven') + '</p></div>' +
          '<div class="stat-item reveal"><h3>' + esc(h.stats3_number || '50+') + '</h3><p>' + esc(h.stats3_label || 'Countries Served') + '</p></div>' +
          '<div class="stat-item reveal"><h3>' + esc(h.stats4_number || '100%') + '</h3><p>' + esc(h.stats4_label || 'Handmade') + '</p></div>' +
        '</div>';
    }

    // Content block 2
    var block2El = document.getElementById('home-block2');
    if (block2El) {
      block2El.innerHTML =
        '<div class="content-block reverse">' +
          '<div class="content-block-image reveal"><img src="' + esc(h.section3_image || '') + '" alt="' + esc(h.section3_title || '') + '" loading="lazy"></div>' +
          '<div class="content-block-text reveal">' +
            '<h2>' + esc(h.section3_title || '') + '</h2>' +
            '<p>' + esc(h.section3_text || '') + '</p>' +
            '<a href="products.html" class="btn btn-outline">View Our Products</a>' +
          '</div>' +
        '</div>';
    }

    // Featured products
    var featuredEl = document.getElementById('home-featured');
    if (featuredEl) {
      window.JC.loadProducts().then(function () {
        var products = (window.JC.cache.products || []).filter(function (p) { return p.is_featured; }).slice(0, 3);
        if (products.length === 0) products = (window.JC.cache.products || []).slice(0, 3);
        if (products.length === 0) {
          featuredEl.innerHTML = '<p class="text-center" style="color:#6B7280;">Products loading...</p>';
          return;
        }
        featuredEl.innerHTML = products.map(function (p) {
          return buildProductCard(p);
        }).join('');
        attachProductCardListeners();
      }).catch(function () {});
    }
  };

  /* ===== ABOUT PAGE ===== */
  window.renderAbout = function () {
    var a = window.JC.cache.about || {};
    var s = window.JC.cache.settings || {};

    // Page hero
    var heroEl = document.getElementById('about-hero');
    if (heroEl) {
      heroEl.innerHTML =
        '<div class="page-hero-bg"><img src="' + esc(a.hero_image || '') + '" alt="About Jamili Carpets" loading="eager"></div>' +
        '<div class="page-hero-overlay"></div>' +
        '<div class="page-hero-content">' +
          '<h1>' + esc(a.hero_title || 'Our Story') + '</h1>' +
          '<p>' + esc(a.hero_subtitle || '') + '</p>' +
          '<div class="breadcrumb"><a href="index.html">Home</a><span>/</span><span>About</span></div>' +
        '</div>';
    }

    // Story
    var storyEl = document.getElementById('about-story');
    if (storyEl) {
      var storyText = (a.story_text || '').split('\n\n');
      storyEl.innerHTML =
        '<div class="content-block">' +
          '<div class="content-block-image reveal"><img src="' + esc(a.story_image || '') + '" alt="' + esc(a.story_title || '') + '" loading="lazy"></div>' +
          '<div class="content-block-text reveal">' +
            '<h2>' + esc(a.story_title || '') + '</h2>' +
            storyText.map(function (p) { return '<p>' + esc(p) + '</p>'; }).join('') +
          '</div>' +
        '</div>';
    }

    // Mission
    var missionEl = document.getElementById('about-mission');
    if (missionEl) {
      missionEl.innerHTML =
        '<div class="content-block reverse">' +
          '<div class="content-block-image reveal"><img src="' + esc(a.mission_image || '') + '" alt="' + esc(a.mission_title || '') + '" loading="lazy"></div>' +
          '<div class="content-block-text reveal">' +
            '<h2>' + esc(a.mission_title || '') + '</h2>' +
            '<p>' + esc(a.mission_text || '') + '</p>' +
          '</div>' +
        '</div>';
    }

    // Vision
    var visionEl = document.getElementById('about-vision');
    if (visionEl) {
      visionEl.innerHTML =
        '<div class="content-block">' +
          '<div class="content-block-image reveal"><img src="' + esc(a.vision_image || '') + '" alt="' + esc(a.vision_title || '') + '" loading="lazy"></div>' +
          '<div class="content-block-text reveal">' +
            '<h2>' + esc(a.vision_title || '') + '</h2>' +
            '<p>' + esc(a.vision_text || '') + '</p>' +
          '</div>' +
        '</div>';
    }

    // Values
    var valuesEl = document.getElementById('about-values');
    if (valuesEl) {
      var values = [
        { icon: a.value1_icon || 'shield', title: a.value1_title || '', text: a.value1_text || '' },
        { icon: a.value2_icon || 'star', title: a.value2_title || '', text: a.value2_text || '' },
        { icon: a.value3_icon || 'handshake', title: a.value3_title || '', text: a.value3_text || '' },
        { icon: a.value4_icon || 'leaf', title: a.value4_title || '', text: a.value4_text || '' }
      ];
      valuesEl.innerHTML = '<div class="values-grid">' + values.map(function (v) {
        return '<div class="value-card reveal">' +
          '<div class="value-icon">' + (icons[v.icon] || icons.shield) + '</div>' +
          '<h4>' + esc(v.title) + '</h4>' +
          '<p>' + esc(v.text) + '</p>' +
        '</div>';
      }).join('') + '</div>';
    }

    // Timeline
    var timelineEl = document.getElementById('about-timeline');
    if (timelineEl) {
      var milestones = [
        { year: a.milestone1_year, title: a.milestone1_title, text: a.milestone1_text },
        { year: a.milestone2_year, title: a.milestone2_title, text: a.milestone2_text },
        { year: a.milestone3_year, title: a.milestone3_title, text: a.milestone3_text },
        { year: a.milestone4_year, title: a.milestone4_title, text: a.milestone4_text },
        { year: a.milestone5_year, title: a.milestone5_title, text: a.milestone5_text },
        { year: a.milestone6_year, title: a.milestone6_title, text: a.milestone6_text }
      ].filter(function (m) { return m.year && m.title; });
      timelineEl.innerHTML = '<div class="timeline">' + milestones.map(function (m) {
        return '<div class="timeline-item reveal">' +
          '<div class="timeline-year">' + esc(m.year) + '</div>' +
          '<h4>' + esc(m.title) + '</h4>' +
          '<p>' + esc(m.text || '') + '</p>' +
        '</div>';
      }).join('') + '</div>';
    }
  };

  /* ===== SERVICES PAGE ===== */
  window.renderServices = function () {
    var sv = window.JC.cache.services || {};
    var s = window.JC.cache.settings || {};

    // Page hero
    var heroEl = document.getElementById('services-hero');
    if (heroEl) {
      heroEl.innerHTML =
        '<div class="page-hero-bg"><img src="' + esc(sv.hero_image || '') + '" alt="Our Services" loading="eager"></div>' +
        '<div class="page-hero-overlay"></div>' +
        '<div class="page-hero-content">' +
          '<h1>' + esc(sv.hero_title || 'Our Services') + '</h1>' +
          '<p>' + esc(sv.hero_subtitle || '') + '</p>' +
          '<div class="breadcrumb"><a href="index.html">Home</a><span>/</span><span>Services</span></div>' +
        '</div>';
    }

    // Intro
    var introEl = document.getElementById('services-intro');
    if (introEl) {
      introEl.innerHTML = '<div class="container"><p style="max-width:800px;margin:0 auto;text-align:center;color:#6B7280;font-size:1.1rem;">' + esc(sv.intro_text || '') + '</p></div>';
    }

    // Services grid
    var gridEl = document.getElementById('services-grid');
    if (gridEl) {
      var services = [
        { icon: sv.service1_icon || 'paint-brush', title: sv.service1_title || '', text: sv.service1_text || '' },
        { icon: sv.service2_icon || 'droplet', title: sv.service2_title || '', text: sv.service2_text || '' },
        { icon: sv.service3_icon || 'wrench', title: sv.service3_title || '', text: sv.service3_text || '' },
        { icon: sv.service4_icon || 'clipboard', title: sv.service4_title || '', text: sv.service4_text || '' },
        { icon: sv.service5_icon || 'globe', title: sv.service5_title || '', text: sv.service5_text || '' },
        { icon: sv.service6_icon || 'home', title: sv.service6_title || '', text: sv.service6_text || '' },
        { icon: sv.service7_icon || 'spray', title: sv.service7_title || '', text: sv.service7_text || '' },
        { icon: sv.service8_icon || 'briefcase', title: sv.service8_title || '', text: sv.service8_text || '' }
      ].filter(function (s2) { return s2.title; });
      gridEl.innerHTML = '<div class="services-grid">' + services.map(function (svc) {
        return '<div class="service-card reveal">' +
          '<div class="service-icon">' + (icons[svc.icon] || icons['paint-brush']) + '</div>' +
          '<h3>' + esc(svc.title) + '</h3>' +
          '<p>' + esc(svc.text) + '</p>' +
        '</div>';
      }).join('') + '</div>';
    }
  };

  /* ===== FAQ PAGE ===== */
  window.renderFAQ = function () {
    var faqList = window.JC.cache.faq || [];

    // Page hero
    var heroEl = document.getElementById('faq-hero');
    if (heroEl) {
      heroEl.innerHTML =
        '<div class="page-hero-bg"><img src="https://placehold.co/1920x600/0D1B2A/C99A47?text=FAQ" alt="FAQ" loading="eager"></div>' +
        '<div class="page-hero-overlay"></div>' +
        '<div class="page-hero-content">' +
          '<h1>Frequently Asked Questions</h1>' +
          '<p>Find answers to the most common questions about our carpets and services.</p>' +
          '<div class="breadcrumb"><a href="index.html">Home</a><span>/</span><span>FAQ</span></div>' +
        '</div>';
    }

    var listEl = document.getElementById('faq-list');
    if (listEl) {
      if (faqList.length === 0) {
        listEl.innerHTML = '<p class="text-center" style="color:#6B7280;">FAQ content is loading...</p>';
        return;
      }
      listEl.innerHTML = '<div class="faq-list">' + faqList.map(function (item, i) {
        return '<div class="faq-item reveal" data-index="' + i + '">' +
          '<div class="faq-question">' +
            '<span>' + esc(item.question) + '</span>' +
            '<div class="faq-icon">' + icons['chevron-down'] + '</div>' +
          '</div>' +
          '<div class="faq-answer"><p>' + esc(item.answer) + '</p></div>' +
        '</div>';
      }).join('') + '</div>';

      // Attach toggle listeners
      listEl.querySelectorAll('.faq-item').forEach(function (item) {
        var question = item.querySelector('.faq-question');
        question.addEventListener('click', function () {
          item.classList.toggle('active');
        });
      });
    }
  };

  /* ===== CONTACT PAGE ===== */
  window.renderContact = function () {
    var c = window.JC.cache.contact || {};
    var s = window.JC.cache.settings || {};

    // Page hero
    var heroEl = document.getElementById('contact-hero');
    if (heroEl) {
      heroEl.innerHTML =
        '<div class="page-hero-bg"><img src="' + esc(c.hero_image || '') + '" alt="Contact Us" loading="eager"></div>' +
        '<div class="page-hero-overlay"></div>' +
        '<div class="page-hero-content">' +
          '<h1>' + esc(c.hero_title || 'Get in Touch') + '</h1>' +
          '<p>' + esc(c.hero_subtitle || '') + '</p>' +
          '<div class="breadcrumb"><a href="index.html">Home</a><span>/</span><span>Contact</span></div>' +
        '</div>';
    }

    // Contact info
    var infoEl = document.getElementById('contact-info');
    if (infoEl) {
      infoEl.innerHTML =
        '<div class="contact-info-card">' +
          '<h3>Contact Information</h3>' +
          '<div class="contact-info-item">' +
            '<div class="contact-icon">' + icons.location + '</div>' +
            '<div class="contact-text"><h4>Address</h4><p>' + esc(s.address || '') + '</p></div>' +
          '</div>' +
          '<div class="contact-info-item">' +
            '<div class="contact-icon">' + icons.phone + '</div>' +
            '<div class="contact-text"><h4>Phone</h4><a href="tel:' + esc(s.phone || '') + '">' + esc(s.phone || '') + '</a></div>' +
          '</div>' +
          '<div class="contact-info-item">' +
            '<div class="contact-icon">' + icons.whatsapp + '</div>' +
            '<div class="contact-text"><h4>WhatsApp</h4><a href="' + esc(s.whatsapp || '') + '" target="_blank" rel="noopener">Chat with us</a></div>' +
          '</div>' +
          '<div class="contact-info-item">' +
            '<div class="contact-icon">' + icons.mail + '</div>' +
            '<div class="contact-text"><h4>Email</h4><a href="mailto:' + esc(s.email || '') + '">' + esc(s.email || '') + '</a></div>' +
          '</div>' +
          '<div class="contact-info-item">' +
            '<div class="contact-icon">' + icons.clock + '</div>' +
            '<div class="contact-text"><h4>Opening Hours</h4><p>' + esc(s.opening_hours || '') + '</p></div>' +
          '</div>' +
          '<div class="contact-social">' +
            '<a href="' + esc(s.whatsapp || '') + '" target="_blank" rel="noopener" aria-label="WhatsApp">' + icons.whatsapp + '</a>' +
            '<a href="' + esc(s.instagram || '') + '" target="_blank" rel="noopener" aria-label="Instagram">' + icons.instagram + '</a>' +
            '<a href="' + esc(s.facebook || '') + '" target="_blank" rel="noopener" aria-label="Facebook">' + icons.facebook + '</a>' +
          '</div>' +
        '</div>';
    }

    // Form card
    var formEl = document.getElementById('contact-form-card');
    if (formEl) {
      formEl.innerHTML =
        '<div class="contact-form-card">' +
          '<h3>' + esc(c.form_title || 'Send Us a Message') + '</h3>' +
          '<p class="form-intro">' + esc(c.form_text || '') + '</p>' +
          '<div class="form-message" id="form-message"></div>' +
          '<form id="contact-form">' +
            '<div class="form-row">' +
              '<div class="form-group"><label for="name">Name *</label><input type="text" id="name" name="name" required></div>' +
              '<div class="form-group"><label for="email">Email *</label><input type="email" id="email" name="email" required></div>' +
            '</div>' +
            '<div class="form-row">' +
              '<div class="form-group"><label for="phone">Phone</label><input type="tel" id="phone" name="phone"></div>' +
              '<div class="form-group"><label for="subject">Subject</label><input type="text" id="subject" name="subject"></div>' +
            '</div>' +
            '<div class="form-group"><label for="message">Message *</label><textarea id="message" name="message" required></textarea></div>' +
            '<button type="submit" class="btn btn-primary btn-lg">Send Message</button>' +
          '</form>' +
        '</div>';
    }

    // Map
    var mapEl = document.getElementById('contact-map');
    if (mapEl) {
      mapEl.innerHTML =
        '<div class="container">' +
          '<div class="section-title"><h2>' + esc(c.map_title || 'Visit Our Showroom') + '</h2><p>' + esc(c.map_text || '') + '</p></div>' +
          '<div class="map-container">' +
            '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3300.5!2d69.17!3d34.52!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzTCsDMxJzEyLjAiTiA2OcKwMTAnMTIuMCJF!5e0!3m2!1sen!2s!4v1700000000000" allowfullscreen loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>' +
          '</div>' +
        '</div>';
    }
  };

  /* ===== PRODUCTS PAGE ===== */
  window.renderProducts = function () {
    var products = window.JC.cache.products || [];

    // Page hero
    var heroEl = document.getElementById('products-hero');
    if (heroEl) {
      heroEl.innerHTML =
        '<div class="page-hero-bg"><img src="https://placehold.co/1920x600/0D1B2A/C99A47?text=Our+Products" alt="Products" loading="eager"></div>' +
        '<div class="page-hero-overlay"></div>' +
        '<div class="page-hero-content">' +
          '<h1>Our Carpet Collection</h1>' +
          '<p>Explore our exquisite range of handmade Afghan carpets, each woven with tradition and artistry.</p>' +
          '<div class="breadcrumb"><a href="index.html">Home</a><span>/</span><span>Products</span></div>' +
        '</div>';
    }

    var gridEl = document.getElementById('products-grid');
    if (gridEl) {
      if (products.length === 0) {
        gridEl.innerHTML = '<p class="text-center" style="color:#6B7280;padding:3rem;">Products are loading...</p>';
        return;
      }
      gridEl.innerHTML = '<div class="products-grid">' + products.map(function (p) {
        return buildProductCard(p);
      }).join('') + '</div>';
      attachProductCardListeners();
    }
  };

  /* ===== BUILD PRODUCT CARD ===== */
  function buildProductCard(p) {
    var img = p.image_front || 'https://placehold.co/600x450/1B365D/C99A47?text=Product';
    return '<div class="product-card reveal" data-product-id="' + (p.id || '') + '">' +
      '<div class="product-card-image">' +
        '<img src="' + esc(img) + '" alt="' + esc(p.name) + '" loading="lazy">' +
        (p.is_featured ? '<span class="product-card-badge">Featured</span>' : '') +
      '</div>' +
      '<div class="product-card-body">' +
        '<h3>' + esc(p.name) + '</h3>' +
        '<p class="product-desc">' + esc(p.description || '') + '</p>' +
        '<div class="product-specs">' +
          '<span class="product-spec"><strong>Size:</strong> ' + esc(p.size || 'N/A') + '</span>' +
          '<span class="product-spec"><strong>Quality:</strong> ' + esc(p.quality || 'N/A') + '</span>' +
          '<span class="product-spec"><strong>Material:</strong> ' + esc(p.material || 'N/A') + '</span>' +
        '</div>' +
        '<div class="product-card-footer">' +
          '<span class="product-price">' + esc(p.price || 'Enquire via WhatsApp') + '</span>' +
          '<button class="btn btn-primary view-product" data-product-id="' + (p.id || '') + '">View Details</button>' +
        '</div>' +
      '</div>' +
    '</div>';
  }

  /* ===== PRODUCT MODAL ===== */
  function attachProductCardListeners() {
    document.querySelectorAll('.view-product').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var id = this.getAttribute('data-product-id');
        openProductModal(id);
      });
    });
  }

  function openProductModal(id) {
    var products = window.JC.cache.products || [];
    var p = products.find(function (x) { return String(x.id) === String(id); });
    if (!p) return;

    var s = window.JC.cache.settings || {};
    var images = [p.image_front, p.image_back, p.image_detail].filter(function (x) { return x; });
    if (images.length === 0) images = ['https://placehold.co/600x400/1B365D/C99A47?text=No+Image'];

    var modal = document.getElementById('product-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'product-modal';
      modal.className = 'modal-overlay';
      document.body.appendChild(modal);
    }

    var whatsappMsg = encodeURIComponent('Hello, I am interested in the "' + p.name + '" carpet. Could you please provide more information?');
    var whatsappLink = (s.whatsapp || 'https://wa.me/+93777697777') + (s.whatsapp && s.whatsapp.indexOf('?') !== -1 ? '&' : '?') + 'text=' + whatsappMsg;

    modal.innerHTML =
      '<div class="modal-content">' +
        '<button class="modal-close" aria-label="Close">&times;</button>' +
        '<div class="modal-body">' +
          '<div class="modal-images">' +
            '<img class="modal-main-image" id="modal-main-image" src="' + esc(images[0]) + '" alt="' + esc(p.name) + '">' +
            '<div class="modal-thumbnails">' +
              images.map(function (img, i) {
                return '<div class="modal-thumbnail' + (i === 0 ? ' active' : '') + '" data-image="' + esc(img) + '"><img src="' + esc(img) + '" alt="View ' + (i + 1) + '"></div>';
              }).join('') +
            '</div>' +
          '</div>' +
          '<div class="modal-details">' +
            '<h2>' + esc(p.name) + '</h2>' +
            '<div class="product-description">' + esc(p.description || '') + '</div>' +
            '<table class="modal-spec-table">' +
              '<tr><td>Size</td><td>' + esc(p.size || 'Custom Size Available') + '</td></tr>' +
              '<tr><td>Quality (Knot Density)</td><td>' + esc(p.quality || 'N/A') + '</td></tr>' +
              '<tr><td>Material</td><td>' + esc(p.material || 'Wool') + '</td></tr>' +
              '<tr><td>Washing Type</td><td>' + esc(p.washing_type || 'Regular') + '</td></tr>' +
              '<tr><td>Country of Origin</td><td>' + esc(p.country_of_origin || 'Afghanistan') + '</td></tr>' +
              '<tr><td>Category</td><td>' + esc(p.category || 'Handmade') + '</td></tr>' +
              '<tr><td>Price</td><td><strong style="color:#C99A47;">' + esc(p.price || 'Enquire via WhatsApp') + '</strong></td></tr>' +
            '</table>' +
            '<div class="modal-actions">' +
              '<a href="' + esc(whatsappLink) + '" class="btn btn-whatsapp" target="_blank" rel="noopener">' + icons.whatsapp + ' Enquire via WhatsApp</a>' +
              '<a href="mailto:' + esc(s.email || '') + '?subject=' + encodeURIComponent('Enquiry: ' + p.name) + '" class="btn btn-outline">' + icons.mail + ' Email Us</a>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>';

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Thumbnail switching
    modal.querySelectorAll('.modal-thumbnail').forEach(function (thumb) {
      thumb.addEventListener('click', function () {
        var imgSrc = this.getAttribute('data-image');
        document.getElementById('modal-main-image').src = imgSrc;
        modal.querySelectorAll('.modal-thumbnail').forEach(function (t) { t.classList.remove('active'); });
        this.classList.add('active');
      });
    });

    // Close
    modal.querySelector('.modal-close').addEventListener('click', function () {
      closeModal(modal);
    });
    modal.addEventListener('click', function (e) {
      if (e.target === modal) closeModal(modal);
    });
  }

  function closeModal(modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  // Close modal on Escape
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      var modal = document.getElementById('product-modal');
      if (modal && modal.classList.contains('active')) closeModal(modal);
    }
  });

})();
