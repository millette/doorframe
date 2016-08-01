function (doc, req) {
  templates = require('views/lib/templates')

  return { body: templates.doc({ req: req, doc: doc, user: req.userCtx }) }
}
