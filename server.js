'use strict';

var fs = require('fs');
var _ = require('underscore');
var extend = require('extend');
var Q = require('q');
var bodyParser = require('body-parser');
var express = require('express');
var app = express();

var api = express.Router();
app.use('/api', api);

var items = [
  {id: 1, name: "My Item", description: "This is mine. Ain't nobody else's."},
  {id: 2, name: "Someone else's Item", description: "Psht"},
  {id: 3, name: "Third item", description: "How generic..."}
];
api.get('/items', function(req, res) {
  return res.json(items);
});
api.get('/items/:id', function(req, res) {
  return res.json(items.filter(function(item) { return item.id == req.params.id; }).pop());
});
api.post('/items', bodyParser.json(), function(req, res) {
  var item = extend({}, req.body);
  item.id = nextId();
  items.push(item);
  res.status(201).json(item);
});
api.put('/items/:id', bodyParser.json(), function(req, res) {
  var item = items.filter(function(item) { return item.id == req.params.id; }).pop();
  extend(item, req.body);
  setTimeout(function() {
    res.json(item);
  }, 3000);
});
api.delete('/items/:id', function(req, res) {
  items.some(function(item, index) {
    if (item.id == req.params.id) {
      items.slice(index, 1);
      return true;
    }
  });
  res.status(204);
})



app.set('views', __dirname);
app.set('view engine', 'ejs');
app.use('/static/', express.static(__dirname + '/src'));

app.get('*', function(req, res) {
  jsSrcPaths(__dirname + '/src').then(function(files) {
    res.render('app', { js: files });
  });
});

app.listen(3000);




function nextId() {
  return items
    .map(function(item) {return item.id; })
    .reduce(function(id, previd) { return id > previd ? id : previd; }, 0) + 1;
}

function jsSrcPaths(basePath, localPath) {
  localPath || (localPath = '');
  var withPath = prependPath.bind(null, localPath);
  var toFiles = recursiveDir.bind(null, basePath);
  return Q.nfcall(fs.readdir, prependPath(basePath, localPath))
    .then(function(files) {
      return files.filter(blacklist).map(withPath);
    })
    .then(function(files) {
      return Q.all(files.map(toFiles));
    })
    .then(function(files) {
      return _.flatten(files).filter(isJs);
    });
};
function isJs(file) {
  return file.substr(-3) === '.js';
}
function statFile(file) {
  return Q.nfcall(fs.stat, file);
}
function recursiveDir(basePath, file) {
  return statFile(basePath + file).then(function(stat) {
    return stat.isDirectory() ? jsSrcPaths(basePath, file) : file;
  })
}
function prependPath(path, file) {
  return path + '/' + file;
}
function blacklist(file) {
  return ['assets', 'app.js', 'routes.js'].indexOf(file) === -1;
}
