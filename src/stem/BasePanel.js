define(['jquery'], function($) {
  var BasePanel = function(options) {
    // this.moveable = options && options.moveable;
    // this.resizeable = options && options.resizeable;
    // this.closeable = options && options.closeable;
    this.windowState = null;
    this.state = null;
    this.started = false;
    this.container = null;
    this.templateString = "<div></div>";
  };

  BasePanel.prototype.init = function() {
    this.postMixInProperties();
    this.buildRendering();
    this.postCreate();
    this.element.appendTo(this.container);
  };

  BasePanel.prototype.postMixInProperties = function() {

  };

  BasePanel.prototype.buildRendering = function() {
    this.element = $(this.templateString);
  }

  BasePanel.prototype.postCreate = function() {

  };

  BasePanel.prototype.startup = function() {
    this.started = true;
  };

  BasePanel.prototype.resize = function() {

  };

  BasePanel.prototype.moveTo = function(position) {
    var style = {
      'position': 'absolute'
    };
    if ('left' in position) {
      style.left = position.left;
    }
    if ('top' in position) {
      style.top = position.top;
    }
    this.element.css(style);
  };

  BasePanel.prototype.setPosition = function(position) {
    var style = {
      'position': 'absolute';
    };

    for (var p in position) {
      style[p] = position[p];
    }

    this.element.css(style);
  };

  BasePanel.prototype.setWidget = function(w) {
    this.widget = w;
    // this.widget.element.appendTo(this.element);
  };

  BasePanel.prototype.destroy = function() {
    if (this.widget && this.widget.element) {
      this.widget.destroy();
    }
    $.empty(this.element);
  };
})