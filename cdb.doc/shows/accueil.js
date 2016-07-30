function (doc, req) {
  // couchdb n'aime vraiment pas l'usage de l'argument ?rev
  // on s'en occupe ici (peut-être des effets secondaires..?)
  var body = '<!doctype html><html><head><meta charset="utf-8">' +
    '<script type="text/javascript">window.MathJax = { AuthorInit: function () {' +
    ' window.MathJax.cdnVersion = "" } }</script>' +
    '<script type="text/javascript" async src="js/MathJax/MathJax.js?config=TeX-AMS-MML_HTMLorMML"></script>' +
    '</head><body>'

  if (req && req.userCtx && req.userCtx.name) {
    body += '<form id="login"><input type="hidden" name="logout" value="logout"><input type="submit" value="logout"></form>'
  } else {
    body += '<form id="login"><input type="text" name="name" placeholder="username"></form>'
  }

  body += '<p>When $$a \\ne 0,$$ there are two solutions to \\(ax^2 + bx + c = 0\\) and they are $$x = {-b \\pm \\sqrt{b^2-4ac} \\over 2a}.$$</p>' +
    '<pre>' + JSON.stringify(req, null, " ") + '</pre>' +
    '<script type="text/javascript" src="js/jquery/dist/jquery.min.js"></script>' +
    '<script type="text/javascript" src="js/main.js"></script></body></html>'

  return {
    body: body
  }
}

