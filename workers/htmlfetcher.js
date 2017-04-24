// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting.
var archive = require('../helpers/archive-helpers/');
var CronJob = require('cron').CronJob;

var job = new CronJob('* 15 * * * *', () => {
  archive.readListOfUrls((urls) => {
    urls.forEach(url => {
      archive.downloadUrls(url);
    });
  });
}, true, 'America/Los_Angeles');

job.start();