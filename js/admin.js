/* ============================================================
   JAMILI CARPETS — Admin Panel JavaScript
   Handles: login, CRUD for all content, image uploads,
   product management, FAQ management, message viewing.
   ============================================================ */

(function () {
  'use strict';

  var client = null;
  var adminData = {};

  /* ===== TOAST ===== */
  function toast(msg, type) {
    var el = document.getElementById('admin-toast');
    if (!el) return;
    el.textContent = msg;
    el.className = 'admin-toast show ' + (type || '');
    setTimeout(function () { el.className = 'admin-toast'; }, 3000);
  }

  /* ===== GET CLIENT ===== */
  function getClient() {
    return window.SupabaseClient.getClient().then(function (c) {
      client = c;
      return c;
    });
  }

  /* ===== LOGIN ===== */
  function initLogin() {
    var form = document.getElementById('admin-login-form');
    if (!form) return;

    // Check if already logged in
    getClient().then(function (c) {
      var session = c.auth.getSession();
      if (session && session.data && session.data.session) {
        showAdmin(session.data.session.user.email);
      }
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var email = document.getElementById('login-email').value.trim();
      var password = document.getElementById('login-password').value.trim();
      var msg = document.getElementById('login-message');

      if (!email || !password) {
        msg.className = 'form-message error';
        msg.textContent = 'Please enter email and password.';
        return;
      }

      getClient().then(function (c) {
        return c.auth.signInWithPassword({ email: email, password: password });
      }).then(function (result) {
        if (result.error) throw result.error;
        showAdmin(result.data.user.email);
      }).catch(function (err) {
        msg.className = 'form-message error';
        msg.textContent = 'Login failed: ' + (err.message || 'Invalid credentials');
      });
    });

    var logoutBtn = document.getElementById('admin-logout');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', function () {
        getClient().then(function (c) { return c.auth.signOut(); }).then(function () {
          location.reload();
        });
      });
    }
  }

  function showAdmin(email) {
    document.getElementById('admin-login-section').style.display = 'none';
    document.getElementById('admin-panel-section').style.display = 'block';
    document.getElementById('admin-user').style.display = 'flex';
    document.getElementById('admin-email').textContent = email;
    loadAllAdminData();
  }

  /* ===== LOAD ALL DATA ===== */
  function loadAllAdminData() {
    var tables = ['site_settings', 'home_content', 'about_content', 'services_content', 'contact_content'];
    var promises = tables.map(function (t) {
      return client.from(t).select('*').limit(1).then(function (res) {
        if (res.error) throw res.error;
        adminData[t] = res.data && res.data[0] ? res.data[0] : {};
      });
    });

    Promise.all(promises).then(function () {
      populateSiteSettings();
      populateHome();
      populateAbout();
      populateServices();
      populateContact();
      loadProducts();
      loadFAQs();
      loadMessages();
    }).catch(function (err) {
      toast('Error loading data: ' + err.message, 'error');
    });
  }

  /* ===== TABS ===== */
  function initTabs() {
    document.querySelectorAll('.admin-tab').forEach(function (tab) {
      tab.addEventListener('click', function () {
        var target = this.getAttribute('data-tab');
        document.querySelectorAll('.admin-tab').forEach(function (t) { t.classList.remove('active'); });
        this.classList.add('active');
        document.querySelectorAll('.admin-panel').forEach(function (p) { p.style.display = 'none'; });
        var panel = document.getElementById('tab-' + target);
        if (panel) panel.style.display = 'block';
      });
    });
  }

  /* ===== IMAGE UPLOAD HELPER ===== */
  function setupUpload(btnId, fileId, previewId, folder, callback) {
    var btn = document.getElementById(btnId);
    var fileInput = document.getElementById(fileId);
    var preview = document.getElementById(previewId);
    if (!btn || !fileInput) return;

    btn.addEventListener('click', function () { fileInput.click(); });
    fileInput.addEventListener('change', function () {
      var file = this.files[0];
      if (!file) return;
      toast('Uploading image...', '');
      window.SupabaseClient.uploadFile(file, folder).then(function (url) {
        if (preview) preview.src = url;
        callback(url);
        toast('Image uploaded successfully!', 'success');
      }).catch(function (err) {
        toast('Upload failed: ' + err.message, 'error');
      });
    });
  }

  /* ===== POPULATE SITE SETTINGS ===== */
  function populateSiteSettings() {
    var d = adminData.site_settings || {};
    document.getElementById('site-company-name').value = d.company_name || '';
    document.getElementById('site-logo-preview').src = d.logo_url || '';
    document.getElementById('site-hero-type').value = d.hero_type || 'image';
    document.getElementById('site-hero-url').value = d.hero_url || '';
    document.getElementById('site-hero-title').value = d.hero_title || '';
    document.getElementById('site-hero-subtitle').value = d.hero_subtitle || '';
    document.getElementById('site-hero-button').value = d.hero_button_text || '';
    document.getElementById('site-phone').value = d.phone || '';
    document.getElementById('site-whatsapp').value = d.whatsapp || '';
    document.getElementById('site-email').value = d.email || '';
    document.getElementById('site-address').value = d.address || '';
    document.getElementById('site-maps').value = d.google_maps || '';
    document.getElementById('site-instagram').value = d.instagram || '';
    document.getElementById('site-facebook').value = d.facebook || '';
    document.getElementById('site-hours').value = d.opening_hours || '';

    adminData._logoUrl = d.logo_url || '';

    setupUpload('site-logo-btn', 'site-logo-file', 'site-logo-preview', 'logo', function (url) {
      adminData._logoUrl = url;
    });
  }

  /* ===== POPULATE HOME ===== */
  function populateHome() {
    var d = adminData.home_content || {};
    document.getElementById('home-s1-title').value = d.section1_title || '';
    document.getElementById('home-s1-text').value = d.section1_text || '';
    document.getElementById('home-s1-img-preview').src = d.section1_image || '';
    document.getElementById('home-s2-title').value = d.section2_title || '';
    document.getElementById('home-s2-text').value = d.section2_text || '';
    document.getElementById('home-s3-title').value = d.section3_title || '';
    document.getElementById('home-s3-text').value = d.section3_text || '';
    document.getElementById('home-s3-img-preview').src = d.section3_image || '';
    document.getElementById('home-f1-title').value = d.feature1_title || '';
    document.getElementById('home-f1-text').value = d.feature1_text || '';
    document.getElementById('home-f2-title').value = d.feature2_title || '';
    document.getElementById('home-f2-text').value = d.feature2_text || '';
    document.getElementById('home-f3-title').value = d.feature3_title || '';
    document.getElementById('home-f3-text').value = d.feature3_text || '';
    document.getElementById('home-f4-title').value = d.feature4_title || '';
    document.getElementById('home-f4-text').value = d.feature4_text || '';
    document.getElementById('home-st1-num').value = d.stats1_number || '';
    document.getElementById('home-st1-label').value = d.stats1_label || '';
    document.getElementById('home-st2-num').value = d.stats2_number || '';
    document.getElementById('home-st2-label').value = d.stats2_label || '';
    document.getElementById('home-st3-num').value = d.stats3_number || '';
    document.getElementById('home-st3-label').value = d.stats3_label || '';
    document.getElementById('home-st4-num').value = d.stats4_number || '';
    document.getElementById('home-st4-label').value = d.stats4_label || '';

    adminData._homeS1Img = d.section1_image || '';
    adminData._homeS3Img = d.section3_image || '';

    setupUpload('home-s1-img-btn', 'home-s1-img-file', 'home-s1-img-preview', 'home', function (url) { adminData._homeS1Img = url; });
    setupUpload('home-s3-img-btn', 'home-s3-img-file', 'home-s3-img-preview', 'home', function (url) { adminData._homeS3Img = url; });
  }

  /* ===== POPULATE ABOUT ===== */
  function populateAbout() {
    var d = adminData.about_content || {};
    document.getElementById('about-hero-title').value = d.hero_title || '';
    document.getElementById('about-hero-subtitle').value = d.hero_subtitle || '';
    document.getElementById('about-hero-img-preview').src = d.hero_image || '';
    document.getElementById('about-story-title').value = d.story_title || '';
    document.getElementById('about-story-text').value = d.story_text || '';
    document.getElementById('about-story-img-preview').src = d.story_image || '';
    document.getElementById('about-mission-title').value = d.mission_title || '';
    document.getElementById('about-mission-text').value = d.mission_text || '';
    document.getElementById('about-mission-img-preview').src = d.mission_image || '';
    document.getElementById('about-vision-title').value = d.vision_title || '';
    document.getElementById('about-vision-text').value = d.vision_text || '';
    document.getElementById('about-vision-img-preview').src = d.vision_image || '';
    document.getElementById('about-values-title').value = d.values_title || '';
    document.getElementById('about-values-text').value = d.values_text || '';
    document.getElementById('about-v1-title').value = d.value1_title || '';
    document.getElementById('about-v1-text').value = d.value1_text || '';
    document.getElementById('about-v2-title').value = d.value2_title || '';
    document.getElementById('about-v2-text').value = d.value2_text || '';
    document.getElementById('about-v3-title').value = d.value3_title || '';
    document.getElementById('about-v3-text').value = d.value3_text || '';
    document.getElementById('about-v4-title').value = d.value4_title || '';
    document.getElementById('about-v4-text').value = d.value4_text || '';
    document.getElementById('about-m1-year').value = d.milestone1_year || '';
    document.getElementById('about-m1-title').value = d.milestone1_title || '';
    document.getElementById('about-m1-text').value = d.milestone1_text || '';
    document.getElementById('about-m2-year').value = d.milestone2_year || '';
    document.getElementById('about-m2-title').value = d.milestone2_title || '';
    document.getElementById('about-m2-text').value = d.milestone2_text || '';
    document.getElementById('about-m3-year').value = d.milestone3_year || '';
    document.getElementById('about-m3-title').value = d.milestone3_title || '';
    document.getElementById('about-m3-text').value = d.milestone3_text || '';
    document.getElementById('about-m4-year').value = d.milestone4_year || '';
    document.getElementById('about-m4-title').value = d.milestone4_title || '';
    document.getElementById('about-m4-text').value = d.milestone4_text || '';
    document.getElementById('about-m5-year').value = d.milestone5_year || '';
    document.getElementById('about-m5-title').value = d.milestone5_title || '';
    document.getElementById('about-m5-text').value = d.milestone5_text || '';
    document.getElementById('about-m6-year').value = d.milestone6_year || '';
    document.getElementById('about-m6-title').value = d.milestone6_title || '';
    document.getElementById('about-m6-text').value = d.milestone6_text || '';

    adminData._aboutHeroImg = d.hero_image || '';
    adminData._aboutStoryImg = d.story_image || '';
    adminData._aboutMissionImg = d.mission_image || '';
    adminData._aboutVisionImg = d.vision_image || '';

    setupUpload('about-hero-img-btn', 'about-hero-img-file', 'about-hero-img-preview', 'about', function (url) { adminData._aboutHeroImg = url; });
    setupUpload('about-story-img-btn', 'about-story-img-file', 'about-story-img-preview', 'about', function (url) { adminData._aboutStoryImg = url; });
    setupUpload('about-mission-img-btn', 'about-mission-img-file', 'about-mission-img-preview', 'about', function (url) { adminData._aboutMissionImg = url; });
    setupUpload('about-vision-img-btn', 'about-vision-img-file', 'about-vision-img-preview', 'about', function (url) { adminData._aboutVisionImg = url; });
  }

  /* ===== POPULATE SERVICES ===== */
  function populateServices() {
    var d = adminData.services_content || {};
    document.getElementById('services-hero-title').value = d.hero_title || '';
    document.getElementById('services-hero-subtitle').value = d.hero_subtitle || '';
    document.getElementById('services-hero-img-preview').src = d.hero_image || '';
    document.getElementById('services-intro-text').value = d.intro_text || '';
    for (var i = 1; i <= 8; i++) {
      document.getElementById('services-s' + i + '-title').value = d['service' + i + '_title'] || '';
      document.getElementById('services-s' + i + '-text').value = d['service' + i + '_text'] || '';
    }

    adminData._servicesHeroImg = d.hero_image || '';

    setupUpload('services-hero-img-btn', 'services-hero-img-file', 'services-hero-img-preview', 'services', function (url) { adminData._servicesHeroImg = url; });
  }

  /* ===== POPULATE CONTACT ===== */
  function populateContact() {
    var d = adminData.contact_content || {};
    document.getElementById('contact-hero-title').value = d.hero_title || '';
    document.getElementById('contact-hero-subtitle').value = d.hero_subtitle || '';
    document.getElementById('contact-hero-img-preview').src = d.hero_image || '';
    document.getElementById('contact-form-title').value = d.form_title || '';
    document.getElementById('contact-form-text').value = d.form_text || '';
    document.getElementById('contact-map-title').value = d.map_title || '';
    document.getElementById('contact-map-text').value = d.map_text || '';

    adminData._contactHeroImg = d.hero_image || '';

    setupUpload('contact-hero-img-btn', 'contact-hero-img-file', 'contact-hero-img-preview', 'contact', function (url) { adminData._contactHeroImg = url; });
  }

  /* ===== SAVE HANDLERS ===== */
  function initSaveHandlers() {
    document.querySelectorAll('[data-save]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var type = this.getAttribute('data-save');
        saveContent(type);
      });
    });
  }

  function saveContent(type) {
    var table = type + '_content';
    if (type === 'site') table = 'site_settings';
    if (type === 'contact') table = 'contact_content';

    var data = {};

    if (type === 'site') {
      data = {
        company_name: val('site-company-name'),
        logo_url: adminData._logoUrl || '',
        hero_type: val('site-hero-type'),
        hero_url: val('site-hero-url'),
        hero_title: val('site-hero-title'),
        hero_subtitle: val('site-hero-subtitle'),
        hero_button_text: val('site-hero-button'),
        phone: val('site-phone'),
        whatsapp: val('site-whatsapp'),
        email: val('site-email'),
        address: val('site-address'),
        google_maps: val('site-maps'),
        instagram: val('site-instagram'),
        facebook: val('site-facebook'),
        opening_hours: val('site-hours')
      };
    } else if (type === 'home') {
      data = {
        section1_title: val('home-s1-title'),
        section1_text: val('home-s1-text'),
        section1_image: adminData._homeS1Img || '',
        section2_title: val('home-s2-title'),
        section2_text: val('home-s2-text'),
        section3_title: val('home-s3-title'),
        section3_text: val('home-s3-text'),
        section3_image: adminData._homeS3Img || '',
        feature1_title: val('home-f1-title'),
        feature1_text: val('home-f1-text'),
        feature2_title: val('home-f2-title'),
        feature2_text: val('home-f2-text'),
        feature3_title: val('home-f3-title'),
        feature3_text: val('home-f3-text'),
        feature4_title: val('home-f4-title'),
        feature4_text: val('home-f4-text'),
        stats1_number: val('home-st1-num'),
        stats1_label: val('home-st1-label'),
        stats2_number: val('home-st2-num'),
        stats2_label: val('home-st2-label'),
        stats3_number: val('home-st3-num'),
        stats3_label: val('home-st3-label'),
        stats4_number: val('home-st4-num'),
        stats4_label: val('home-st4-label')
      };
    } else if (type === 'about') {
      data = {
        hero_title: val('about-hero-title'),
        hero_subtitle: val('about-hero-subtitle'),
        hero_image: adminData._aboutHeroImg || '',
        story_title: val('about-story-title'),
        story_text: val('about-story-text'),
        story_image: adminData._aboutStoryImg || '',
        mission_title: val('about-mission-title'),
        mission_text: val('about-mission-text'),
        mission_image: adminData._aboutMissionImg || '',
        vision_title: val('about-vision-title'),
        vision_text: val('about-vision-text'),
        vision_image: adminData._aboutVisionImg || '',
        values_title: val('about-values-title'),
        values_text: val('about-values-text'),
        value1_title: val('about-v1-title'),
        value1_text: val('about-v1-text'),
        value2_title: val('about-v2-title'),
        value2_text: val('about-v2-text'),
        value3_title: val('about-v3-title'),
        value3_text: val('about-v3-text'),
        value4_title: val('about-v4-title'),
        value4_text: val('about-v4-text'),
        milestone1_year: val('about-m1-year'),
        milestone1_title: val('about-m1-title'),
        milestone1_text: val('about-m1-text'),
        milestone2_year: val('about-m2-year'),
        milestone2_title: val('about-m2-title'),
        milestone2_text: val('about-m2-text'),
        milestone3_year: val('about-m3-year'),
        milestone3_title: val('about-m3-title'),
        milestone3_text: val('about-m3-text'),
        milestone4_year: val('about-m4-year'),
        milestone4_title: val('about-m4-title'),
        milestone4_text: val('about-m4-text'),
        milestone5_year: val('about-m5-year'),
        milestone5_title: val('about-m5-title'),
        milestone5_text: val('about-m5-text'),
        milestone6_year: val('about-m6-year'),
        milestone6_title: val('about-m6-title'),
        milestone6_text: val('about-m6-text')
      };
    } else if (type === 'services') {
      data = {
        hero_title: val('services-hero-title'),
        hero_subtitle: val('services-hero-subtitle'),
        hero_image: adminData._servicesHeroImg || '',
        intro_text: val('services-intro-text')
      };
      for (var i = 1; i <= 8; i++) {
        data['service' + i + '_title'] = val('services-s' + i + '-title');
        data['service' + i + '_text'] = val('services-s' + i + '-text');
      }
    } else if (type === 'contact') {
      data = {
        hero_title: val('contact-hero-title'),
        hero_subtitle: val('contact-hero-subtitle'),
        hero_image: adminData._contactHeroImg || '',
        form_title: val('contact-form-title'),
        form_text: val('contact-form-text'),
        map_title: val('contact-map-title'),
        map_text: val('contact-map-text')
      };
    }

    client.from(table).update(data).eq('id', 1).then(function (res) {
      if (res.error) throw res.error;
      toast(type + ' content saved successfully!', 'success');
    }).catch(function (err) {
      toast('Save failed: ' + err.message, 'error');
    });
  }

  function val(id) {
    var el = document.getElementById(id);
    return el ? el.value : '';
  }

  /* ===== PRODUCTS ===== */
  var editingProductId = null;
  var productImages = { front: '', back: '', detail: '' };

  function loadProducts() {
    client.from('products').select('*').order('display_order').then(function (res) {
      if (res.error) throw res.error;
      var products = res.data || [];
      var listEl = document.getElementById('admin-product-list');
      if (!listEl) return;
      if (products.length === 0) {
        listEl.innerHTML = '<p style="color:#6B7280;">No products yet. Click "Add New Product" to create one.</p>';
        return;
      }
      listEl.innerHTML = products.map(function (p) {
        var img = p.image_front || 'https://placehold.co/60x60/1B365D/C99A47?text=No+Img';
        return '<div class="admin-product-card">' +
          '<div class="admin-product-images">' +
            '<img src="' + (p.image_front || img) + '" alt="Front">' +
            '<img src="' + (p.image_back || img) + '" alt="Back">' +
            '<img src="' + (p.image_detail || img) + '" alt="Detail">' +
          '</div>' +
          '<h4>' + esc(p.name) + '</h4>' +
          '<p style="font-size:0.85rem;color:#6B7280;">' + esc(p.material || '') + ' | ' + esc(p.quality || '') + ' | ' + esc(p.size || '') + '</p>' +
          '<p style="font-size:0.8rem;color:' + (p.is_active ? '#16A34A' : '#DC2626') + ';">' + (p.is_active ? 'Active' : 'Inactive') + (p.is_featured ? ' | Featured' : '') + '</p>' +
          '<div class="admin-product-actions">' +
            '<button class="admin-edit-btn" data-pid="' + p.id + '">Edit</button>' +
            '<button class="admin-delete-btn" data-pid="' + p.id + '">Delete</button>' +
          '</div>' +
        '</div>';
      }).join('');

      listEl.querySelectorAll('.admin-edit-btn').forEach(function (btn) {
        btn.addEventListener('click', function () { editProduct(this.getAttribute('data-pid')); });
      });
      listEl.querySelectorAll('.admin-delete-btn').forEach(function (btn) {
        btn.addEventListener('click', function () { deleteProduct(this.getAttribute('data-pid')); });
      });
    });
  }

  function editProduct(id) {
    client.from('products').select('*').eq('id', id).then(function (res) {
      if (res.error || !res.data || !res.data[0]) return;
      var p = res.data[0];
      editingProductId = id;
      productImages = { front: p.image_front || '', back: p.image_back || '', detail: p.image_detail || '' };

      document.getElementById('product-editor-title').textContent = 'Edit: ' + p.name;
      document.getElementById('product-editor').style.display = 'block';
      document.getElementById('product-id').value = id;
      document.getElementById('product-name').value = p.name || '';
      document.getElementById('product-size').value = p.size || '';
      document.getElementById('product-quality').value = p.quality || '';
      document.getElementById('product-material').value = p.material || '';
      document.getElementById('product-description').value = p.description || '';
      document.getElementById('product-washing').value = p.washing_type || '';
      document.getElementById('product-country').value = p.country_of_origin || '';
      document.getElementById('product-price').value = p.price || '';
      document.getElementById('product-category').value = p.category || '';
      document.getElementById('product-order').value = p.display_order || 0;
      document.getElementById('product-featured').value = String(p.is_featured);
      document.getElementById('product-active').value = String(p.is_active);
      document.getElementById('product-front-preview').src = p.image_front || '';
      document.getElementById('product-back-preview').src = p.image_back || '';
      document.getElementById('product-detail-preview').src = p.image_detail || '';

      setupUpload('product-front-btn', 'product-front-file', 'product-front-preview', 'products', function (url) { productImages.front = url; });
      setupUpload('product-back-btn', 'product-back-file', 'product-back-preview', 'products', function (url) { productImages.back = url; });
      setupUpload('product-detail-btn', 'product-detail-file', 'product-detail-preview', 'products', function (url) { productImages.detail = url; });
    });
  }

  function initProductHandlers() {
    var addBtn = document.getElementById('product-add-btn');
    if (addBtn) {
      addBtn.addEventListener('click', function () {
        editingProductId = null;
        productImages = { front: '', back: '', detail: '' };
        document.getElementById('product-editor-title').textContent = 'Add New Product';
        document.getElementById('product-editor').style.display = 'block';
        document.getElementById('product-id').value = '';
        document.getElementById('product-name').value = '';
        document.getElementById('product-size').value = '';
        document.getElementById('product-quality').value = '';
        document.getElementById('product-material').value = '';
        document.getElementById('product-description').value = '';
        document.getElementById('product-washing').value = '';
        document.getElementById('product-country').value = 'Afghanistan';
        document.getElementById('product-price').value = 'Enquire via WhatsApp';
        document.getElementById('product-category').value = '';
        document.getElementById('product-order').value = 0;
        document.getElementById('product-featured').value = 'false';
        document.getElementById('product-active').value = 'true';
        document.getElementById('product-front-preview').src = '';
        document.getElementById('product-back-preview').src = '';
        document.getElementById('product-detail-preview').src = '';

        setupUpload('product-front-btn', 'product-front-file', 'product-front-preview', 'products', function (url) { productImages.front = url; });
        setupUpload('product-back-btn', 'product-back-file', 'product-back-preview', 'products', function (url) { productImages.back = url; });
        setupUpload('product-detail-btn', 'product-detail-file', 'product-detail-preview', 'products', function (url) { productImages.detail = url; });
      });
    }

    var saveBtn = document.getElementById('product-save-btn');
    if (saveBtn) {
      saveBtn.addEventListener('click', function () {
        var data = {
          name: val('product-name'),
          size: val('product-size'),
          quality: val('product-quality'),
          material: val('product-material'),
          description: val('product-description'),
          washing_type: val('product-washing'),
          country_of_origin: val('product-country'),
          price: val('product-price'),
          category: val('product-category'),
          display_order: parseInt(val('product-order')) || 0,
          is_featured: val('product-featured') === 'true',
          is_active: val('product-active') === 'true',
          image_front: productImages.front,
          image_back: productImages.back,
          image_detail: productImages.detail
        };

        if (!data.name) {
          toast('Product name is required', 'error');
          return;
        }

        if (editingProductId) {
          client.from('products').update(data).eq('id', editingProductId).then(function (res) {
            if (res.error) throw res.error;
            toast('Product updated!', 'success');
            document.getElementById('product-editor').style.display = 'none';
            loadProducts();
          }).catch(function (err) { toast('Update failed: ' + err.message, 'error'); });
        } else {
          client.from('products').insert(data).then(function (res) {
            if (res.error) throw res.error;
            toast('Product added!', 'success');
            document.getElementById('product-editor').style.display = 'none';
            loadProducts();
          }).catch(function (err) { toast('Add failed: ' + err.message, 'error'); });
        }
      });
    }

    var cancelBtn = document.getElementById('product-cancel-btn');
    if (cancelBtn) {
      cancelBtn.addEventListener('click', function () {
        document.getElementById('product-editor').style.display = 'none';
      });
    }
  }

  function deleteProduct(id) {
    if (!confirm('Are you sure you want to delete this product? This cannot be undone.')) return;
    client.from('products').delete().eq('id', id).then(function (res) {
      if (res.error) throw res.error;
      toast('Product deleted', 'success');
      loadProducts();
    }).catch(function (err) { toast('Delete failed: ' + err.message, 'error'); });
  }

  /* ===== FAQ ===== */
  var editingFAQId = null;

  function loadFAQs() {
    client.from('faq_content').select('*').order('display_order').then(function (res) {
      if (res.error) throw res.error;
      var faqs = res.data || [];
      var listEl = document.getElementById('admin-faq-list');
      if (!listEl) return;
      if (faqs.length === 0) {
        listEl.innerHTML = '<p style="color:#6B7280;">No FAQ entries yet. Click "Add New Question" to create one.</p>';
        return;
      }
      listEl.innerHTML = faqs.map(function (f) {
        return '<div class="admin-faq-item">' +
          '<h4>' + esc(f.question) + '</h4>' +
          '<p style="font-size:0.85rem;color:#6B7280;margin-bottom:0.75rem;">' + esc(f.answer).substring(0, 100) + '...</p>' +
          '<p style="font-size:0.8rem;color:' + (f.is_active ? '#16A34A' : '#DC2626') + ';">' + (f.is_active ? 'Active' : 'Inactive') + ' | Order: ' + f.display_order + '</p>' +
          '<div class="admin-product-actions">' +
            '<button class="admin-edit-btn" data-fid="' + f.id + '">Edit</button>' +
            '<button class="admin-delete-btn" data-fid="' + f.id + '">Delete</button>' +
          '</div>' +
        '</div>';
      }).join('');

      listEl.querySelectorAll('.admin-edit-btn').forEach(function (btn) {
        btn.addEventListener('click', function () { editFAQ(this.getAttribute('data-fid')); });
      });
      listEl.querySelectorAll('.admin-delete-btn').forEach(function (btn) {
        btn.addEventListener('click', function () { deleteFAQ(this.getAttribute('data-fid')); });
      });
    });
  }

  function editFAQ(id) {
    client.from('faq_content').select('*').eq('id', id).then(function (res) {
      if (res.error || !res.data || !res.data[0]) return;
      var f = res.data[0];
      editingFAQId = id;
      document.getElementById('faq-editor-title').textContent = 'Edit FAQ';
      document.getElementById('faq-editor').style.display = 'block';
      document.getElementById('faq-id').value = id;
      document.getElementById('faq-question').value = f.question || '';
      document.getElementById('faq-answer').value = f.answer || '';
      document.getElementById('faq-order').value = f.display_order || 0;
      document.getElementById('faq-active').value = String(f.is_active);
    });
  }

  function initFAQHandlers() {
    var addBtn = document.getElementById('faq-add-btn');
    if (addBtn) {
      addBtn.addEventListener('click', function () {
        editingFAQId = null;
        document.getElementById('faq-editor-title').textContent = 'Add New FAQ';
        document.getElementById('faq-editor').style.display = 'block';
        document.getElementById('faq-id').value = '';
        document.getElementById('faq-question').value = '';
        document.getElementById('faq-answer').value = '';
        document.getElementById('faq-order').value = 0;
        document.getElementById('faq-active').value = 'true';
      });
    }

    var saveBtn = document.getElementById('faq-save-btn');
    if (saveBtn) {
      saveBtn.addEventListener('click', function () {
        var data = {
          question: val('faq-question'),
          answer: val('faq-answer'),
          display_order: parseInt(val('faq-order')) || 0,
          is_active: val('faq-active') === 'true'
        };
        if (!data.question || !data.answer) {
          toast('Question and answer are required', 'error');
          return;
        }
        if (editingFAQId) {
          client.from('faq_content').update(data).eq('id', editingFAQId).then(function (res) {
            if (res.error) throw res.error;
            toast('FAQ updated!', 'success');
            document.getElementById('faq-editor').style.display = 'none';
            loadFAQs();
          }).catch(function (err) { toast('Update failed: ' + err.message, 'error'); });
        } else {
          client.from('faq_content').insert(data).then(function (res) {
            if (res.error) throw res.error;
            toast('FAQ added!', 'success');
            document.getElementById('faq-editor').style.display = 'none';
            loadFAQs();
          }).catch(function (err) { toast('Add failed: ' + err.message, 'error'); });
        }
      });
    }

    var cancelBtn = document.getElementById('faq-cancel-btn');
    if (cancelBtn) {
      cancelBtn.addEventListener('click', function () {
        document.getElementById('faq-editor').style.display = 'none';
      });
    }
  }

  function deleteFAQ(id) {
    if (!confirm('Delete this FAQ entry?')) return;
    client.from('faq_content').delete().eq('id', id).then(function (res) {
      if (res.error) throw res.error;
      toast('FAQ deleted', 'success');
      loadFAQs();
    }).catch(function (err) { toast('Delete failed: ' + err.message, 'error'); });
  }

  /* ===== MESSAGES ===== */
  function loadMessages() {
    var listEl = document.getElementById('admin-messages-list');
    if (!listEl) return;
    listEl.innerHTML = '<div class="admin-loading"><div class="spinner"></div>Loading messages...</div>';

    client.from('contact_messages').select('*').order('created_at', { ascending: false }).then(function (res) {
      if (res.error) throw res.error;
      var msgs = res.data || [];
      if (msgs.length === 0) {
        listEl.innerHTML = '<p style="color:#6B7280;">No messages yet.</p>';
        return;
      }
      listEl.innerHTML = msgs.map(function (m) {
        return '<div class="admin-message-item' + (m.is_read ? '' : ' unread') + '" data-mid="' + m.id + '">' +
          '<h4>' + esc(m.name) + ' <span style="font-weight:400;color:#6B7280;font-size:0.85rem;">&lt;' + esc(m.email) + '&gt;</span></h4>' +
          '<div class="message-meta">' +
            (m.phone ? 'Phone: ' + esc(m.phone) + ' | ' : '') +
            (m.subject ? 'Subject: ' + esc(m.subject) + ' | ' : '') +
            new Date(m.created_at).toLocaleString() +
          '</div>' +
          '<p>' + esc(m.message) + '</p>' +
          '<div style="margin-top:0.75rem;">' +
            '<a href="mailto:' + esc(m.email) + '" class="btn btn-primary" style="padding:0.4rem 1rem;font-size:0.8rem;">Reply</a>' +
            (m.is_read ? '' : ' <button class="admin-edit-btn" data-mark-read="' + m.id + '" style="padding:0.4rem 1rem;">Mark as Read</button>') +
            ' <button class="admin-delete-btn" data-del-msg="' + m.id + '" style="padding:0.4rem 1rem;">Delete</button>' +
          '</div>' +
        '</div>';
      }).join('');

      listEl.querySelectorAll('[data-mark-read]').forEach(function (btn) {
        btn.addEventListener('click', function () {
          var id = this.getAttribute('data-mark-read');
          client.from('contact_messages').update({ is_read: true }).eq('id', id).then(function () { loadMessages(); });
        });
      });
      listEl.querySelectorAll('[data-del-msg]').forEach(function (btn) {
        btn.addEventListener('click', function () {
          if (!confirm('Delete this message?')) return;
          var id = this.getAttribute('data-del-msg');
          client.from('contact_messages').delete().eq('id', id).then(function () { loadMessages(); });
        });
      });
    });
  }

  /* ===== ESCAPE ===== */
  function esc(str) {
    if (str == null) return '';
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  /* ===== INIT ===== */
  function init() {
    if (!window.SupabaseClient || !window.SupabaseClient.isConfigured()) {
      var loginSection = document.getElementById('admin-login-section');
      if (loginSection) {
        loginSection.innerHTML = '<div class="admin-login"><h2>Setup Required</h2><p>Please configure Supabase first. Edit <code>js/config.js</code> with your Supabase URL and anon key, then run <code>supabase-schema.sql</code> in your Supabase SQL Editor.</p></div>';
      }
      return;
    }
    initLogin();
    initTabs();
    initSaveHandlers();
    initProductHandlers();
    initFAQHandlers();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
