(function () {
  'use strict'
  return function (doc, req) {
    const templates = require('views/lib/templates')

    if (req.userCtx.roles.indexOf('prof') === -1) {
      start({ code: 401, headers: { 'Content-Type': 'text/html; charset=utf-8' } })
      return 'Doit être loggué en tant que prof.'
    }

    return {
      body: templates.doc({
        edit: '/' + req.requested_path.join('/') + '/edit',
        doc: doc,
        user: req.userCtx
      })
    }
  }
}())
