(function(global) {
  // global.PATH = location.pathname;
  var path = location.pathname;
  var parts = path.split('/');
  if (parts.length > 0 && /$\.html|\.htm/.test(parts[parts.length - 1])) {
    parts.pop();
    global.PATH = parts.join('/') + '/';
  } else {
    global.PATH = parts.join('/');
  }
  global.stemConfig = {
    layoutId: "stem-layout-manager"
  };

  var mapApi = "";
  var ap = Array.prototype;
  var polyfills = [{
    test: window.console && window.console.log,
    nope: './stem/libs/polyfills/console.js',
    complete: null
  }, {
    test: Date.now && typeof Date.now === 'function',
    nope: './stem/libs/polyfills/now.js',
    complete: null
  }, {
    test: Function.prototype.bind,
    nope: './stem/libs/polyfills/bind.js',
    complete: null
  }, {
    test: String.prototype.trim,
    nope: './stem/libs/polyfills/trim.js',
    complete: null
  }, {
    test: ap.indexOf && ap.lastIndexOf && ap.forEach && ap.every && ap.some &&
      ap.filter && ap.map && ap.reduce && ap.reduceRight,
    nope: './stem/libs/polyfills/array.generics.js',
    complete: null
  }];

  global.loadPolyfills = function(tests, cb) {
    var resources = [];
    if (tests.length === 0) {
      cb();
      return;
    }
    for (var i = 0, len = tests.length; i < len; i++) {
      var polyfill = tests[i];
      if (!polyfill.test) {
        resources.push({
          type: 'script',
          url: polyfill.nope,
          complete: polyfill.complete
        });
      }
    }

    loadResources(resources, cb);
  }
  var resources = [{
    url: './roots/require.js',
    type: 'script',
    complete: null
  }, {
    url: './roots/openlayers/ol.css',
    type: 'styleSheet',
    complete: null
  }, {
    url: './roots/../stem/css/style.css',
    type: 'styleSheet',
    complete: null
  }];

  loadPolyfills(polyfills, function() {
    loadResources(resources, function() {
      requirejs.config({
        baseUrl: './roots',
        packages: [{
          name: 'stem',
          location: '../stem'
        }, {
          name: 'bodhis',
          location: '../bodhis'
        }, {
          name: 'themes',
          location: '../themes'
        }],
        map: {
          '*': {
            'jquery': 'jquery-private',
          },
          'jquery-private': {
            'jquery': 'jquery'
          }
        }
      });
      require(['stem/main'], function(stemMain) {
        stemMain.init();
      });
    })
  })
})(window);