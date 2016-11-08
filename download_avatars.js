
const request = require('request');
const fs = require('fs');

var requestOptions = request('https://api.github.com/repos/jquery/jquery/contributors').on('response', (response) => {

  console.log('Response Status Code: ', response.statusCode);
  console.log('Response Message: ', response.statusMessage);
  console.log('Response Content Type: ', response.headers['content-type']);

})

console.log(requestOptions);