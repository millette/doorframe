(function () {
  return function (doc, req) {
    const templates = require('views/lib/templates')
    if (req.userCtx.name && req.userCtx.roles.indexOf('prof') === -1) {
      return { code: 401, body: 'nope' }
    }
    return { body: templates.prof({ user: req.userCtx }) }
  }
}())
