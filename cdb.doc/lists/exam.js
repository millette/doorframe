function (head, req) {
  var row
  var s
  const templates = require('views/lib/templates')
  start({ headers: { 'Content-Type': 'text/html; charset=utf-8' } })
  send(templates.htmlbegin())
  send('<h1><a href="/">Accueil</a></h1>')
  send('<h2>Liste des questions de l\'examen <span class="label">' + req.requested_path[1] + '</span></h2>')
  send('<p><a href="/' + req.requested_path.join('/') + '/expanded">Voir l\'examen</a></p>')
  send('<ul>')
  while((row = getRow())) {
    s = '<li><a href="/doc/' + row.id + '">' + row.id + '</a></li>'
    send(s)
  }
  send('</ul>')
  send(templates.htmlend())
}
