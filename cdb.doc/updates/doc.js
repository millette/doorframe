function (doc, req) {
  if (!doc) {
    doc = {
      _id: req.form.id.trim(),
      created_at: new Date().toISOString()
    }
  }

  doc.question = req.form.question.trim(),
  doc.updated_at = new Date().toISOString()

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
