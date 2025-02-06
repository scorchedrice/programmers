function route(pathname, handle, response) {
  if (pathname === '/favicon.ico') return
  console.log('pathname: ', pathname);
  if (typeof handle[pathname] === "function") {
    handle[pathname](response);
  } else {
    response.writeHead(404, {'Content-Type': 'text/html'});
    response.write('404');
    response.end();
  }
}

exports.route = route;
