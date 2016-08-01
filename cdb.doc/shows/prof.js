function (doc, req) {
  templates = require('views/lib/templates')

  return { body: templates.prof({ user: req.userCtx }) }
}
