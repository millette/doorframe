(function () {
  'use strict'
  return function (newDoc, oldDoc, userCtx, secObj) {
    if (userCtx.roles.indexOf('prof') === -1 && userCtx.roles.indexOf('_admin') === -1) {
      const errStr = 'Missing appropriate role.'
      const err = new Error(errStr)
      err.forbidden = errStr
      throw err
    }
  }
}())
