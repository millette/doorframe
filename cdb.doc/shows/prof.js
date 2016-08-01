function (doc, req) {
  templates = require('views/lib/templates')
  if (!req.userCtx.name || req.userCtx.roles.indexOf('prof') !== -1) {
    return { body: templates.prof({ user: req.userCtx }) }
  }
  return { body: 'nope' }
}
