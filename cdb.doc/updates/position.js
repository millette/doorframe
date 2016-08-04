(function () {
  return function (doc, req) {
    var i
    if (!doc) {
      return [null, { code: 401, body: 'What, no doc?' }]
    }

    i = doc.examens.indexOf(req.query.exam)
    if (i === -1) {
      return [null, { code: 200, body: JSON.stringify({ error: 'Question not in exam.' }) }]
    }

    if (typeof doc.position !== 'object') {
      doc.position = { }
    }

    doc.position[req.query.exam] = Math.min(Math.max(parseInt(req.query.position, 10), 1), 1000)
    return [doc, { code: 200, body: JSON.stringify({ ok: true }) }]
  }
}())
