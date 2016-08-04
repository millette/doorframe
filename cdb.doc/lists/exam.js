(function () {
  return function (head, req) {
    var row
    var s
    const templates = require('views/lib/templates')
    start({ headers: { 'Content-Type': 'text/html; charset=utf-8' } })
    send(templates.htmlbegin())
    send('<h1><a href="/">Accueil</a></h1>')
    send('<h2>Liste des questions de l\'examen <span class="label">' + req.query.exam + '</span></h2>')
    send('<p><a href="/exam/' + req.query.exam + '/expanded">Voir l\'examen</a>')
    if (req.userCtx.name) {
      if (req.userCtx.roles.indexOf('prof') === -1) {
        send(' ou encore <a href="/exam/' + req.query.exam + '/results">consulter mes résultats</a>.</p>')
      } else {
        send(' ou encore <a href="/exam/' + req.query.exam + '/reorder">réordonner les questions</a>.</p>')
      }
    }
    send('</p>')
    send('<ul>')
    while ((row = getRow())) {
      s = '<li><a href="/doc/' + row.id + '">' + row.id + '</a></li>'
      send(s)
    }
    send('</ul>')
    send(templates.htmlend())
  }
}())
