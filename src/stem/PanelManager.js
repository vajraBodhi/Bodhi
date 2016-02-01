define(['jquery', 'stem/utils'], function($, utils) {
  var instance = null;
  var clazz = function(params) {
    this.appCausality = params.appCausality;
    this.panels = [];
    this.clazzCache = {};
  };

  clazz.prototype.loadPanel = function(pConfig, wConfig) {
    var that = this;
    function loadPanelClass(uri) {
      var def = $.Deferred();

      if (that.clazzCache[uri]) {
        def.resolve(that.clazzCache[uri]);
      } else {
        require([uri], function(clazz) {
          that.clazzCache[uri] = clazz;
          def.resolve(clazz);
        });
      }

      return def;
    }

    return loadPanelClass(pConfig.uri).then(function(clazz) {
      var pid = pConfig.uri + Date.now();
      var options = {
        label: wConfig.label,
        config: wConfig,
        uri: pConfig.uri,
        position: pConfig.position,
        map: this.map,
        id: pid
      };

      var panel = clazz.create(options);
      panel.setPosition(pConfig.position);
      that.openPanel(panel);
      that.panels.push(panel);

      return panel;
    });
  };

  clazz.openPanel = function(panel) {
    panel.startup();
  };

  clazz.getInstance = function(params) {
    if (instance === null) {
      instance = new clazz(params);
    }

    return instance;
  };

  return clazz;
});