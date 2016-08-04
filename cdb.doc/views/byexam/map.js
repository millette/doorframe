(function () {
  return function (doc) {
    if (!doc.examens || !doc.examens.length) { return }
    doc.examens.forEach(function (exam) { emit([exam, doc.position && doc.position[exam]]) })
  }
}())
