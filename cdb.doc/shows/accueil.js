function (doc, req) {
  templates = require('views/lib/templates')

/*
  if (req && req.userCtx && req.userCtx.name) {
    body += '<form id="login"><input type="hidden" name="logout" value="logout"><input type="submit" value="logout"></form>'
  } else {
    body += '<form id="login"><input type="text" name="name" placeholder="username"></form>'
  }
*/
  return { body: templates.accueil({ user: req.userCtx }) }
}
