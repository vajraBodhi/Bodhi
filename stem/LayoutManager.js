define(["jquery", "stem/MapManager", "stem/BodhiManager", "stem/utils"],
  function($, MapManager, BodhiManager, utils) {
  var instance = null;

  var clazz = function() {
    utils.subscribe('causalityLoaded', this.onCausalityLoaded, this);
    utils.subscribe('mapLoaded', this.onMapLoaded, this);
    //beforedestroy
  };

  clazz.prototype.onCausalityLoaded = function(causality) {
    this.appCausality = causality;
    this._loadSeasonStyles(causality.theme);

    this.mapManager = MapManager.getInstance({
      'appCausality': this.appCausality
    });
    this.mapManager.loadMap(causality.map);
  };

  clazz.prototype.onMapLoaded = function(map) {
    this.map = map;
    this.widgetManager = BodhiManager.getInstance({
      'map': this.map,
      'appCausality': this.appCausality
    });
    this.loadOnTouchBodhis();
  };

  clazz.prototype._loadSeasonStyles = function(theme) {
    this._loadSeasonCommonStyle(theme.name);
    this._loadSeasonSpecificStyle(theme.name, theme.style);
  };

  clazz.prototype._loadSeasonCommonStyle = function(name) {
    var url = window.PATH + "/themes/" + name + "/default.css";
    utils.loadStylesheet(url);
    $('body').addClass(name);
  };

  clazz.prototype._loadSeasonSpecificStyle = function(name, styleName) {
    var url = window.PATH + "/themes/" + name + "/styles/" + styleName + ".css";
    utils.loadStylesheet(url);
    $('body').addClass(name);
  };

  clazz.prototype.loadOnTouchBodhis = function() {
    var onTouchBodhis = this.appCausality &&
      this.appCausality.bodhiOnTouch && this.appCausality.bodhiOnTouch.bodhis;
    if (onTouchBodhis && onTouchBodhis.length > 0) {
      var defs = [];
      for (var i = 0, len = onTouchBodhis.length; i < len; i++) {
        var b = onTouchBodhis[i];
        defs.push(this.widgetManager.loadBodhi(b));
      }
      var that = this;
      $.when.apply($, defs).then(function(widgets) {
        utils.publish('onTouchBodhisLoaded');
      });
    }
  };

  clazz.getInstance = function() {
    if (instance === null) {
      instance = new clazz();
    }

    return instance;
  };

  return clazz;
});