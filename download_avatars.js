
const request = require('request');
const fs = require('fs');
const owner = process.argv[2];
const repo = process.argv[3];

console.log('Welcome to the GitHub Avatar Downloader!');

//configuring a function that will fetch the contributors data
function getRepoContributors(repoOwner, repoName, cb) {
  var GITHUB_USER = "ckwjdals90"
  var GITHUB_TOKEN = "6294b5e65259a9d5a7be5c07c64e9821977418fe"

  // the URL is created for request
  var requestURL = 'https://' + GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';
  // var requestURL = `https://{$GITHUB_USER}:{$GITHUB_TOKEN}@api.github.com/repos/{$repoOwner}/{$repoName}/contributors`;      //not working..

  // creating a key for authorization
  var authorizedURL = {
      url: requestURL,
      headers: {
        'User-Agent': 'why do you even care',
        Authorization: process.env['GITHUB_API_KEY']
      }
    }

  // getRepoContributors function initializes the request
  request(authorizedURL, (error, response, body) => {
    // console.log('Response Status Code: ', response.statusCode);                  // checking
    // console.log('Response Message: ', response.statusMessage);                   // response
    // console.log('Response Content Type: ', response.headers['content-type']);)   // status
    var contributors = JSON.parse(body);      // parsing the data received into usable format

    cb(error, contributors);    // initializing the callback of getRepoContributors function.
  });

}

// executing getRepoContributors function
getRepoContributors(owner, repo, (err, contributors) => {     // configuring the callback function
  //loop through the contributors array
  return contributors.forEach(function(contributor) {
    //url as contributors.avatar_url
    //filePath as contributors.login
    downloadImageByURL(contributor.avatar_url, contributor.login);
})
});


function downloadImageByURL(url, filePath) {
// console.log(url);         // checking avatar_url of the input
// console.log(filePath);    // checking id of the input
  request(url).pipe(fs.createWriteStream('./avatars/' + filePath + '.jpg'));

}



