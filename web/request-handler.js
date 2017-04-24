var path = require('path');
var archive = require('../helpers/archive-helpers');
var httpHelpers = require('./http-helpers');
var fs = require('fs');
var url = require('url');
// require more modules/folders here!

exports.handleRequest = function (req, res) {

  var encoding = {encoding: 'utf8'};

  if (req.method === 'GET' && req.url === '/') {
    fs.readFile(archive.paths.siteAssets + '/index.html', encoding, (err, data) => {
      if (err) {
        console.error(err);
      }
      res.end(data);
    });
  } else if (req.method === 'GET') {
    var requestedURL = req.url;
    fs.readFile(archive.paths.archivedSites + requestedURL, encoding, (err, data) => {
      if (err) {
        // res.statusCode = 404;
        fs.readFile(archive.paths.siteAssets + requestedURL, encoding, (err, data) => {
          if (err) {
            res.statusCode = 404;
          }
          res.end(data);
        });
      } else {
        res.statusCode = 200;
        res.end(data);
      }
    });
  } else if (req.method === 'POST') {
    var postedURL = '';
    res.statusCode = 302;
    req.on('data', (data) => {
      postedURL += data;
    });
    req.on('end', () => {
      postedURL = postedURL.slice(4);
      archive.addUrlToList(postedURL, () => {
        fs.readFile(archive.paths.siteAssets + '/loading.html', encoding, (err, data) => {
          if (err) {
            console.error(err);
          }
          res.end(data);
        });
      });
    });
  }
};
