define(['jquery', 'stem/utils'], function($, utils) {
  var instance = null;
  var clazz = function(params) {
    this.appCausality = params.appCausality;
  };


  clazz.getInstance = function(params) {
    if (instance === null) {
      instance = new clazz(params);
    }

    return instance;
  };

  return clazz;
});