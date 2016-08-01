function (doc, req) {
  const canEdit = req.userCtx.roles.indexOf('prof') !== -1
  const templates = require('views/lib/templates')

  return {
    body: templates.doc({
      edit: canEdit && ('/' + req.requested_path.join('/') + '/edit'),
      doc: doc,
      user: req.userCtx
    })
  }
}
