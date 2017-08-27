var express = require('express');
var app = express();
var fs = require('fs');
var path = require('path');

var dir = path.join(__dirname, '../index.html');
var file = fs.readFileSync(dir, 'utf8');

app.get('*', (req, res) => res.send(file));

app.listen(3000, function () {
  console.log('Listening on port 3000');
});
