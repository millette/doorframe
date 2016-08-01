function(newDoc, oldDoc, userCtx, secObj) {
  if (userCtx.roles.indexOf('prof') === -1 && userCtx.roles.indexOf('_admin') === -1) {
    throw({ forbidden: 'Missing appropriate role.' });
  }
}
