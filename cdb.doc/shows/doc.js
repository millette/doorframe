function (doc, req) {
  templates = require('views/lib/templates')

  return { body: templates.doc({ doc: doc, user: req.userCtx }) }
}
