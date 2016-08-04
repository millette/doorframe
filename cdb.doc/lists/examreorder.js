(function () {
  'use strict'
  return function (head, req) {
    var row
    var s
    const templates = require('views/lib/templates')

    if (!req.userCtx.name || req.userCtx.roles.indexOf('prof') === -1) {
      start({ code: 401 })
      send('niet')
      return
    }

    start({ headers: { 'Content-Type': 'text/html; charset=utf-8' } })
    send(templates.htmlbegin())
    send('<h1><a href="/">Accueil</a></h1>')
    send('<h2>Réordonner les questions de l\'examen <span class="label">' + req.query.exam + '</span></h2>')
    send('<ol class="examreorder" data-exam="' + req.query.exam + '">')
    while ((row = getRow())) {
      s = '<li data-position="' + (row.key[1] || 500) + '" data-id="' + row.id + '">' + row.id + '</li>'
      send(s)
    }
    send('</ol>')
    send(templates.htmlend())
  }
}())
