define(['jquery', 'stem/BasePanel'], function($, BasePanel) {
  // this.moveable = options && options.moveable;
  //   this.resizeable = options && options.resizeable;
  //   this.closeable = options && options.closeable;
  //   this.windowState = null;
  //   this.state = null;
  //   this.started = false;
  //   this.container = null;
  //   this.templateString = "<div></div>";

  var DockerPanel = function(options) {
    this.templateString = '<div class="docker-panel">' +
      '<div class="header">' +
        '<div class="title"></div>' +
        '<div class="close"></div>' +
      '</div>'
      '<div class="content"></div>' +
    '</div>';
  };

  DockerPanel.prototype.postCreate = function() {
    this.titleNode = $('.title', this.element);
    this.closeBtn = $('.close', this.element);
    this.contentNode = $('.content', this.element);
  };

  DockerPanel.prototype.setWidget = function(w) {
    this.constructor.prototype.setWidget.apply(this, arguments);
    this.titleNode.html(w.options('label'));
    w.element.appendTo(this.contentNode);
  };

  return {
    create: function(options) {
      var bp = new BasePanel(options);
      DockerPanel.prototype = bp;
      var instance = new DockerPanel();
      instance.init();

      return instance;
    }
  };
});