
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
    console.log('Response Status Code: ', response.statusCode);
    console.log('Response Message: ', response.statusMessage);
    console.log('Response Content Type: ', response.headers['content-type']);
  })

}
getRepoContributors("jquery", "jquery", (err, result) => {
  console.log("Errors:", err);
  console.log("Result:", result);
})

// var requestOptions = request('https://api.github.com/repos/jquery/jquery/contributors').on('response', (response) => {

//   console.log('Response Status Code: ', response.statusCode);
//   console.log('Response Message: ', response.statusMessage);
//   console.log('Response Content Type: ', response.headers['content-type']);

// })

// console.log(requestOptions);



