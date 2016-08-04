(function () {
  return function (doc, req) {
    const templates = require('views/lib/templates')

    return { body: templates.accueil({ user: req.userCtx }) }
  }
}())
