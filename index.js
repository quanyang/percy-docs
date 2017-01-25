/* jshint node: true */
'use strict';

var flatiron = require('broccoli-flatiron');
var fs = require('fs');
var Funnel = require('broccoli-funnel');
var mergeTrees = require('broccoli-merge-trees');
var path = require('path');

var deepGet = function(obj, path){
  for (var i = 0, path = path.split('/'), len=path.length; i<len; i++) {
    obj = obj[path[i]];
  };
  return obj;
};

// Build-time transformations of the markdown files.
function recursivePreprocess(obj, _rootObj) {
  _rootObj = _rootObj || obj;
  Object.keys(obj).forEach(function(key) {
    var value = obj[key];
    if (typeof(value) === 'string') {
      // Base case: have a file string.
      var includeRegex = /\[!INCLUDE \/docs\/(.*)?\]/g;
      var match;
      var newValue = value;
      // For every !INCLUDE, replace it. Partials shouldn't include anything themselves.
      while (match = includeRegex.exec(value)) {
        var otherFileContents = deepGet(_rootObj, match[1]);
        newValue = newValue.replace(match[0], otherFileContents);
      }
      obj[key] = newValue;
    } else {
      // Recursive case: have a nested object.
      recursivePreprocess(value, _rootObj);
    }
  })
}

module.exports = {
  name: 'percy-docs',
  isDevelopingAddon: function() {
    return true;
  },
  treeForPublic: function(tree) {
    var assetsTree = new Funnel('public', {
      include: [
        'images/docs/*.png',
        'images/docs/*.jpg',
        'images/docs/*.jpeg',
        'images/docs/*.gif',
        'images/docs/*.svg',
      ],
    });
    return mergeTrees([tree, assetsTree], {
      overwrite: true
    });
  },
  treeForAddon: function(tree) {
    // Find all the markdown files in the `/docs` folder, and flatiron them into `markdownFiles.js`.
    var mdPaths = [];
    mdPaths.push(path.join(__dirname, 'docs'))
    var mdFunnel = new Funnel(mergeTrees(mdPaths), {
      include: [new RegExp(/\.md/)]
    });
    var mdFlattened = flatiron(mdFunnel, {
      outputFile: 'markdownFiles.js',
      trimExtensions: true,
      afterBuild: function(obj) {
        recursivePreprocess(obj);
      }
    });
    tree = mergeTrees([tree, mdFlattened]);

    return this._super.treeForAddon.call(this, tree);
  }
};
