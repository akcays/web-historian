var fs = require('fs');
var path = require('path');
var _ = require('underscore');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback) {
  fs.readFile(exports.paths.list, (err, sites) => {
    if (err) { throw err; }
    sites = sites.toString().split('\n');
    if (callback) {
      callback(sites);
    }
  });
};

exports.isUrlInList = function(url, callback) {
  exports.readListOfUrls((sites) => {
    var isInList = sites.find((urlItem) => urlItem === url) ? true : false;
    callback(isInList);
  });
};

exports.addUrlToList = function(url, callback) {
  exports.isUrlInList(url, isInList => {
    if (!isInList) {
      fs.writeFile(exports.paths.list, url + '\n', (err) => {
        callback();
      });
    }
  });
};

exports.isUrlArchived = function(url, callback) {
  fs.exists(exports.paths.archivedSites + '/' + url, (exists) => callback(exists));
};

exports.downloadUrls = function(urls) {
  urls.forEach(url => {
    fs.access(exports.paths.archivedSites + '/' + url, (err) => {
      if (err) {
        fs.writeFileSync(exports.paths.archivedSites + '/' + url);
      }
    });
  });
};
