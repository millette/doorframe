function (doc, req) {
  const canEdit = req.userCtx.roles.indexOf('prof') !== -1
  const templates = require('views/lib/templates')
  if (canEdit) {
    return { body: templates.docedit({ doc: doc || { }, user: req.userCtx }) }
  }
  return { code: 401, body: 'nope' }
}
