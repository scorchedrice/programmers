function route(pathname, handle, response, productId) {
  if (pathname === '/favicon.ico') return
  console.log('pathname: ', pathname);
  if (typeof handle[pathname] === "function") {
    handle[pathname](response, productId);
  } else {
    response.writeHead(404, {'Content-Type': 'text/html'});
    response.write('404');
    response.end();
  }
}

exports.route = route;
