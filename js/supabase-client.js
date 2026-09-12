/* ============================================================
   JAMILI CARPETS — Supabase Client
   Loads the Supabase JS SDK and provides a singleton client.
   Uses CDN build so no npm/build step is required.
   ============================================================ */

(function () {
  'use strict';

  // Load the Supabase client library from CDN (v2)
  function loadSupabaseSDK() {
    return new Promise(function (resolve, reject) {
      if (window.supabase) {
        resolve(window.supabase);
        return;
      }
      var script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2';
      script.onload = function () { resolve(window.supabase); };
      script.onerror = function () { reject(new Error('Failed to load Supabase SDK')); };
      document.head.appendChild(script);
    });
  }

  var clientPromise = null;

  window.SupabaseClient = {
    /**
     * Get the initialized Supabase client.
     * Returns a Promise that resolves to the client.
     */
    getClient: function () {
      if (clientPromise) return clientPromise;

      clientPromise = loadSupabaseSDK().then(function (supabase) {
        var config = window.SUPABASE_CONFIG || {};
        if (!config.url || config.url.indexOf('YOUR-PROJECT-REF') !== -1) {
          throw new Error('Supabase is not configured. Edit js/config.js with your Supabase URL and anon key.');
        }
        return supabase.createClient(config.url, config.anonKey);
      });

      return clientPromise;
    },

    /**
     * Check whether Supabase has been configured.
     */
    isConfigured: function () {
      var config = window.SUPABASE_CONFIG || {};
      return !!(config.url && config.url.indexOf('YOUR-PROJECT-REF') === -1 && config.anonKey && config.anonKey.indexOf('YOUR-SUPABASE-ANON-KEY') === -1);
    },

    /**
     * Get a public URL for a file in the storage bucket.
     */
    getPublicUrl: function (path) {
      var config = window.SUPABASE_CONFIG || {};
      if (!path) return '';
      if (path.indexOf('http') === 0) return path; // already a full URL
      return config.url + '/storage/v1/object/public/' + config.bucket + '/' + path;
    },

    /**
     * Upload a file to the storage bucket.
     * Returns a Promise resolving to the public URL.
     */
    uploadFile: function (file, folder) {
      return this.getClient().then(function (client) {
        var config = window.SUPABASE_CONFIG || {};
        var ext = (file.name.split('.').pop() || 'jpg').toLowerCase();
        var name = Date.now() + '-' + Math.random().toString(36).slice(2, 8) + '.' + ext;
        var path = (folder ? folder + '/' : '') + name;
        return client.storage.from(config.bucket).upload(path, file, {
          cacheControl: '3600',
          upsert: false
        }).then(function (result) {
          if (result.error) throw result.error;
          return SupabaseClient.getPublicUrl(path);
        });
      });
    }
  };
})();
