var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');
var helpers = require('./http-helpers')
// require more modules/folders here!

exports.handleRequest = function (req, res) {
  if (req.method === 'GET' && req.url === '/') {
    res.writeHead(200, helpers.headers);
    fs.readFile(archive.paths.siteAssets + '/index.html', {encoding: 'utf8'}, function (err, data){
      res.end(data)
      console.log("HERE---->>", data);
    });
  } else if (req.method === 'GET') {
    var url = req.url;
    console.log("IM HERE!")
    archive.readListOfUrls(function(data) {
      console.log('Link ---> ', data);
      if (url === data) {
        res.end(data)
      } else {
        archive.addUrlToList(url);
      }
    })
  }

  // res.end(archive.paths.list);
};
