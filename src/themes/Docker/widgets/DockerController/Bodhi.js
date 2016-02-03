define(['jquery', 'stem/utils', 'stem/BaseBodhi', 'jquery-ui'], function($, utils) {
  $.widget('bodhi.DockerController', {
    baseClass: 'stem-widgets-dockercontroller',
    // templateString: '<div>'
    postMixInProperties: function() {
      var ts = '<div class="ctl-cnt">' +
        '<ul class="itm-ls"></ul>' +
        '</div>';
      this.option('templateString', ts);
    },

    postCreate: function() {
      debugger;
      this.itemList = $('.itm-ls', this.element);

      var appCausality = this.option('appCausality');
      if (appCausality && appCausality.bodhiInController) {
        ciCtl = appCausality.bodhiInController;
        this.panelConfig = ciCtl.panel;
        var iconConfigs = ciCtl.bodhis;
        if (iconConfigs) {
          this._createBodhiIcon(iconConfigs);
        }
      }
      console.log(this);
    },

    startup: function() {
      this._superApply(arguments);
    },

    _createBodhiIcon: function(list) {
      for (var i = 0, len = list.length; i < len; i++) {
        var ic = list[i];
        var parts = ic.uri.split('/');
        parts.pop();
        var imgUrl = window.PATH + (parts.join('/') + '/images/icon.png');

        this.itemList.append($('<li class="itm"><img class="icon" src="' + imgUrl + '"></li>'));
      }
    }
  });

  return $.bodhi.DockerController;
});