(function () {
  return function (doc) {
    if (doc.prof) { emit([doc.prof, 'last-editor']) }
    doc.editors.forEach(function (ed) {
      if (ed !== doc.prof) { emit([ed, 'editor']) }
    })
  }
}())
