
const request = require('request');
const fs = require('fs');

console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {
  var GITHUB_USER = "ckwjdals90"
  var GITHUB_TOKEN = "6294b5e65259a9d5a7be5c07c64e9821977418fe"

  var requestURL = 'https://' + GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';

  function authenticateURL(url) {
    return {
      url: url,
      headers: {
        'User-Agent': 'why do you even care',
        Authorization: process.env['GITHUB_API_KEY']
      }
    }
  }

  request(authenticateURL(requestURL), (error, response, body) => {
    var results = JSON.parse(body);

    const avatarURLArray = results.forEach(function(result) {
      console.log(result.avatar_url);
    })
    return avatarURLArray;
  });

}


// getRepoContributors("jquery", "jquery", (err, result) => {
//   console.log("Errors:", err);
//   console.log("Result:", result);
// })


function downloadImageByURL(url, filePath) {

  request(url).pipe(fs.createWriteStream('./' + filePath));

}

downloadImageByURL("https://avatars2.githubusercontent.com/u/2741?v=3&s=466", "avatars/kvirani.jpg")


