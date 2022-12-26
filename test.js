const test = require('tape-run');
const request = require('request');

test('submit form and wait for image', function(t) {
  request.post({
    url: 'https://www.mage.space/',
    headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.75 Safari/537.36'
    },
    form: {
      field1: '#search-bar'
    }
  }, function(err, response, body) {
    t.error(err, 'no error');
    t.equal(response.statusCode, 200, 'status code is 200');

    // Wait for the image to load
    setTimeout(function() {
      // Get the list of images
      request('http://example.com/images', function(err, response, body) {
        t.error(err, 'no error');
        t.equal(response.statusCode, 200, 'status code is 200');
        t.ok(body, 'received image list');
        t.end();
      });
    }, 20000);
  });
});
