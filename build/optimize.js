var fs = require('fs');
var path = require('path');
exec = require('child_process').exec;

if (!fs.existsSync("./output")) {
  fs.mkdirSync('./output');
}

console.log(path.join(__dirname, '../causality.json'));
var appCausality = JSON.parse(fs.readFileSync(path.join(__dirname, '../causality.json'), 'utf-8'));
var bodhis = appCausality.bodhiOnTouch.bodhis;
for (var i = 0, len = bodhis.length; i < len; i++) {
  var b = bodhis[i];
  var parts = b.uri.split('/');
  parts.pop();
  var folder = '../' + parts.join('/') + '/';
  addReourceToBConfig(b, folder, 'manifest', 'json');
  addReourceToBConfig(b, folder, 'causality', 'json');
  addReourceToBConfig(b, folder, 'templateString', 'html');
}

fs.writeFileSync('../causality.json', JSON.stringify(appCausality));
exec('node r.js -o build.js');

function addReourceToBConfig(config, folder, resource, ext) {
  var file = folder + resource + '.' + ext;
  if (fs.existsSync(file)) {
    var data = fs.readFileSync(file);
    if (ext === 'json') {
      data = JSON.parse(data);
      config[resource] = data;
    } else if (ext === 'html') {
      config[resource] = data;
    }
  }
}