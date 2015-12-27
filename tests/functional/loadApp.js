define([
  'intern!object',
  'intern/chai!assert',
], function (registerSuite, assert) {
  registerSuite({
    name: 'loadApp',

    'Click homebutton': function () {
      return this.remote
        .get('http://lzz-pc.chn.esri.com/arcgis/apps/webappbuilder/Bodhi/src/index.html')
        .setFindTimeout(50000)
        .findByCssSelector('body.claro')
          .findByCssSelector('.ol-zoom-extent')
              .findByCssSelector('button')
                .click()
                .getAttribute("title")
                .then(function(value) {
                  assert.equal(value, "Fit to extent");
                });
    }
  });
});