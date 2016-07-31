function (doc, req) {
  templates = require('views/lib/templates')

  return { body: templates.accueil({ user: req.userCtx }) }
}
