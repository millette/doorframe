(function () {
  return function (head, req) {
    var row
    var s
    const templates = require('views/lib/templates')
    start({ headers: { 'Content-Type': 'text/html; charset=utf-8' } })
    send(templates.htmlbegin())
    send('<h1><a href="/">Accueil</a></h1>')
    send('<ul>')
    while ((row = getRow())) {
      s = '<li><a href="/doc/' + row.id + '">' + row.id
      if (row.key[1] === 'last-editor') { s += ' (actuel)' }
      s += '</a></li>'
      send(s)
    }
    send('</ul>')
    send(templates.htmlend())
  }
}())
