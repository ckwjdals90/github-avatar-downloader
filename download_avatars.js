
const request = require('request');
const fs = require('fs');

console.log('Welcome to the GitHub Avatar Downloader!');

//creating a function that will fetch the array of contributors
function getRepoContributors(repoOwner, repoName, cb) {
  var GITHUB_USER = "ckwjdals90"
  var GITHUB_TOKEN = "6294b5e65259a9d5a7be5c07c64e9821977418fe"

  // the
  var requestURL = 'https://' + GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';

  var options = {
      url: requestURL,
      headers: {
        'User-Agent': 'why do you even care',
        Authorization: process.env['GITHUB_API_KEY']
      }
    }

  request(options, (error, response, body) => {
    var contributors = JSON.parse(body);

    cb(error, contributors);
  });

}


getRepoContributors("jquery", "jquery", (err, contributors) => {
  // console.log("Errors:", err);
  // console.log("Result:", contributors);

  //loop through the contributors array
    //url as contributors.avatar_url
    //filePath as contributors.login

  return contributors.forEach(function(contributor) {
    downloadImageByURL(contributor.avatar_url, contributor.login);
})
});


function downloadImageByURL(url, filePath) {
console.log(url);
console.log(filePath);
  request(url).pipe(fs.createWriteStream('./avatars/' + filePath + '.jpg'));

}

// downloadImageByURL("https://avatars2.githubusercontent.com/u/2741?v=3&s=466", "avatars/kvirani.jpg")


