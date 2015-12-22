define(["jquery", 'stem/utils'], function($, utils) {
  var instance = null;
  var clazz = function(params) {
    this.map = params.map;
    this.appCausality = params.appCausality;

    this.widgetsRepo = [];
  };

  clazz.prototype.loadBodhi = function(config) {
    var defs = [];
    var def = $.Deferred();
    var that = this;

    var parts = config.uri.split('/');
    parts.pop();
    var bodhiFolder = window.PATH + parts.join('/');

    defs.push(this.loadBodhiClass(config.uri));
    defs.push(this.loadBodhiManifest(bodhiFolder, config.manifest));

    $.when.apply($, defs).then(function() {
      var clazz = arguments[0];
      var manifest = arguments[1];
      config.manifest = manifest;

      that.loadResources(bodhiFolder, config).then(function(resources) {
        var setting = {
          nls: resources.nls,
          causality: resources.causality,
          templateString: resources.templateString,
          map: that.map,
          appCausality: that.appCausality,
          position: config.position,
          folderUrl: bodhiFolder
        };

        try{
          var $bodhi = new clazz(setting, '<div></div>');
          $bodhi.startup();
          $bodhi.setPosition(config.position);
          that.widgetsRepo.push($bodhi);
          def.resolve($bodhi);
        }catch(err) {
          console.error(err);
          def.resolve(null);
        }
      });
    }, function(err) {
      console.error(err, config.uri);
      def.resolve(null);
    });

    return def;
  };

  clazz.prototype.loadBodhiClass = function(bodhiUri) {
    var def = $.Deferred();
    require([bodhiUri], function(bodhiClass) {
      def.resolve(bodhiClass);
    });

    return def;
  };

  clazz.prototype.loadBodhiManifest = function(bodhiFolder, manifest) {
    var def = $.Deferred();

    if (typeof manifest === 'object') {
      def.resolve(manifest);
    } else {
      $.getJSON(bodhiFolder + '/manifest.json').then(function(m) {
        def.resolve(m);
      });
    }
    return def;
  };

  clazz.prototype.loadResources = function(bodhiFolder, config) {
    var defs = [];
    var that = this;
    var mp = config && config.manifest && config.manifest.properties;

    defs.push(this.loadBodhiTemplate(bodhiFolder, mp && mp.hasUIFile, config.templateString));
    defs.push(this.loadBodhiNls(bodhiFolder, mp && mp.hasUIFile));
    defs.push(this.loadBodhiCausality(bodhiFolder, mp && mp.hasCausality, config.causality));
    defs.push(this.loadBodhiStyle(bodhiFolder));

    return $.when.apply($, defs).then(function() {
      return {
        templateString: arguments[0],
        nls: arguments[1],
        causality: arguments[2]
      };
    });
  };

  clazz.prototype.loadBodhiTemplate = function(bodhiFolder, hasUIFile, templateString) {
    var def = $.Deferred();
    if (templateString) {
      def.resolve(templateString);
    }else if (hasUIFile) {
      require(['text!' + bodhiFolder + '/templates/template.html'], function(template) {
        def.resolve(template);
      });
    } else {
      def.resolve(null);
    }

    return def;
  };

  clazz.prototype.loadBodhiNls = function(bodhiFolder) {
    var def = $.Deferred();
    require(['i18n!' + bodhiFolder + '/nls/strings.js'], function(nls) {
      def.resolve(nls);
    });

    return def;
  };

  clazz.prototype.loadBodhiCausality = function(bodhiFolder, hasCausality, causality) {
    var def = $.Deferred();
    if (causality) {
      def.resolve(causality);
    }else if (hasCausality) {
      var url = bodhiFolder + '/causality.json';
      $.getJSON(url).then(function(causality) {
        def.resolve(causality);
      });
    } else {
      def.resolve(null);
    }

    return def;
  };

  clazz.prototype.loadBodhiStyle = function(bodhiFolder) {
    var def = $.Deferred();
    var url = bodhiFolder + '/css/style.css';
    utils.loadStylesheet(url);
    def.resolve()

    return def;
  };

  clazz.getInstance = function(params) {
    if (instance === null) {
      instance = new clazz(params);
    }

    return instance;
  }

  return clazz;
});