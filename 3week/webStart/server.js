let http = require('http');
let url = require('url')

function start(route, handle) {
  function onRequest(request, response) {
    let pathname = url.parse(request.url).pathname; // parse : legacy
    route(pathname, handle, response);

    console.log(pathname);

  }
  http.createServer(onRequest).listen(8888);
}

exports.start = start;