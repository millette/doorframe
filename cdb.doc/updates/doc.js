function (doc, req) {
  if (doc.created_at) {
    doc.updated_at = new Date().toISOString()
  } else {
    doc.created_at = new Date().toISOString()
    doc.updated_at = doc.created_at
  }

  if (!doc.prof && req.userCtx.name) {
    doc.prof = req.userCtx.name
  }

  if (req.userCtx.name) {
    if (doc.editors && doc.editors.indexOf(req.userCtx.name) === -1) {
      doc.editors.push(req.userCtx.name)
    } else {
      doc.editors = [doc.prof]
    }
  }
  return [doc, { code: 303, headers: { location: '/doc/' + doc._id } }]
}
