function (head, req) {
  var row
  var s
  const templates = require('views/lib/templates')
  if (!req.userCtx.name) {
    start({ code: 401, headers: { 'Content-Type': 'text/html; charset=utf-8' } })
    return send('Doit être loggué.')
  }
  start({ headers: { 'Content-Type': 'text/html' } })
  send(templates.htmlbegin({ withmathjax: true }))
  send('<h1><a href="/">Accueil</a></h1>')
  send('<h2>Les questions (expanded) de l\'examen <span class="label">' + req.requested_path[1] + '</span></h2>')
  send('<div class="row">')
  while((row = getRow())) {
    s = '<div class="column large-6">'
    s += templates.questiononly({ doc: row.doc })
    s += ' </div>'
    send(s)
  }
  send('</div>')
  send(templates.htmlend())
}
