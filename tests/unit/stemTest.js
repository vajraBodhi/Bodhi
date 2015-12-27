define([
  'intern!object',
  'intern/chai!assert',
  'stem/utils'
], function (registerSuite, assert, stemUtils) {
  var checkbox;

  registerSuite({
    name: 'stem_utils',

    'lang': function() {
      var a;
      assert.strictEqual(!!stemUtils.lang, true);
      assert.strictEqual(!stemUtils.lang.isDefined(a), true);
      var e = {};
      assert.strictEqual(stemUtils.lang.isDefined(e), true);
    },

    'pub sub': function () {
      var dfd = this.async(1000);
      stemUtils.subscribe('myTest', dfd.callback(function(evt) {
        assert.strictEqual(evt === 365, true);
      }))
      stemUtils.publish('myTest', 365);
    },

    'loadStylesheet': function() {
      var dfd = this.async(1000);
      stemUtils.loadStylesheet(
        'https://ss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/css/super_min_c29f78d5.css');
      dfd.callback(function(){
        var element = document.querySelector("link[href='https://ss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/css/super_min_c29f78d5.css']");
        assert.strictEqual(element !== null && element !== undefined, true);
      })();
    },

    'loadCausality': function() {
      var dfd = this.async(50000);

      stemUtils.loadCausality('\/\/lzz-pc.chn.esri.com\/arcgis\/apps\/webappbuilder\/Bodhi\/src\/')
      .then(dfd.callback(function(evt) {
        assert.strictEqual(stemUtils.lang.isDefined(evt), true);
        assert.strictEqual(stemUtils.lang.isDefined(evt.version), true);
        assert.strictEqual(evt.version === 0.1, true);
      }))
    }
  });
});