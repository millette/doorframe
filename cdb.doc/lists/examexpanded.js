function (head, req) {
  var row
  var s
  const templates = require('views/lib/templates')
  start({ headers: { 'Content-Type': 'text/html' } })
  send(templates.htmlbegin({ withmathjax: true }))
  send('<h1><a href="/">Accueil</a></h1>')
  send('<h2>Les questions (expanded) de l\'examen <span class="label">' + req.requested_path[1] + '</span></h2>')
  while((row = getRow())) {
    s = '<div>'
    s += templates.questiononly({ doc: row.doc })
    s += ' </div>'
    send(s)
  }
  send(templates.htmlend())
}
