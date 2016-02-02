define(['jquery', 'stem/utils'], function($, utils) {
  $.widget('bodhi.DockerController', {
    baseClass: 'stem-widgets-dockercontroller',
    // templateString: '<div>'
    postMixInProperties: function() {
      var ts = '<div class="ctl-cnt">' +
      '<ul class="itm-ls"></ul>' +
      '</div>'
      this.option('templateString', ts);
    },

    postCreate: function() {
      var this.itemList = $('.itm-ls', this.element);

      var appCausality = this.option('appCausality');
      if (appCausality && appCausality.bodhiInController) {
        ciCtl = appCausality.bodhiInController;
        var this.panelConfig = ciCtl.panel;
        var iconConfigs = ciCtl.bodhis;

        this._createBodhiIcon(iconConfigs);
      }
    },

    startup: function() {
      this._supperApply(arguments);
    },

    _createBodhiIcon: function(list) {
      for (var i = 0, len = list.length; i < len; i++) {
        var ic = list[i];
        var parts = list.uri.split('/');
        parts.pop();
        var imgUrl = this.option('folderUrl') + (parts.join('/') + '/images/icon.png');

        this.itemList.append($('<li class="itm"><img class="icon" src="' + imgUrl + '"></li>'));
      }
    }
  })
})