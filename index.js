/* jshint node: true */
'use strict';

var flatiron = require('broccoli-flatiron');
var fs = require('fs');
var Funnel = require('broccoli-funnel');
var mergeTrees = require('broccoli-merge-trees');
var path = require('path');

module.exports = {
  name: 'percy-docs',
  isDevelopingAddon: function() {
    return true;
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
      trimExtensions: true
    });
    tree = mergeTrees([tree, mdFlattened]);

    return this._super.treeForAddon.call(this, tree);
  }
};
