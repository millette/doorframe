function (doc, req) {
  templates = require('views/lib/templates')
  if (!req.userCtx.roles.indexOf('prof')) {
    return { body: templates.docedit({ req: req, doc: doc, user: req.userCtx }) }
  }
  return { body: 'nope' }
}
