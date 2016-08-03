function (doc, req) {
  if (!doc) {
    doc = {
      _id: req.form.id.trim(),
      created_at: new Date().toISOString()
    }
  }

  // doc.position = Math.min(Math.max(parseInt(req.form.position, 10), 1), 1000)
  doc.question = req.form.question.trim()
  doc.examens = req.form.examens.split(',')
    .map(function (exam) { return exam.trim() })
    .sort()
  doc.choices = []
  if (req.form.choice1) {
    doc.choice = parseInt(req.form.answer, 10)
    delete doc.answer
    doc.choices.push(req.form.choice1.trim())
    if (req.form.choice2) {
      doc.choices.push(req.form.choice2.trim())
      if (req.form.choice3) {
        doc.choices.push(req.form.choice3.trim())
        if (req.form.choice4) {
          doc.choices.push(req.form.choice4.trim())
          if (req.form.choice5) {
            doc.choices.push(req.form.choice5.trim())
          }
        }
      }
    }
  } else {
    doc.answer = req.form.answer.trim()
    delete doc.choice
  }

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
