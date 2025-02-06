let http = require('http');
let url = require('url')

function start(route, handle) {
  function onRequest(request, response) {
    let pathname = url.parse(request.url).pathname; // parse : legacy
    let queryData = url.parse(request.url, true).query;

    route(pathname, handle, response, queryData.productId);

    console.log(pathname);

  }
  http.createServer(onRequest).listen(8888);
}

exports.start = start;