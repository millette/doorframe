function (head, req) {
  var row
  var s
  const templates = require('views/lib/templates')
  start({ headers: { 'Content-Type': 'text/html' } })
  send(templates.htmlbegin())
  send('<h1><a href="/">Accueil</a></h1>')
  send('<h2>Les examens disponibles</h2>')
  send('<ul>')
  while((row = getRow())) {
    log('row:' + JSON.stringify(row))
    s = '<li><a href="/exam/' + row.key[0] + '">' + row.key[0] + '</a> (' + row.value + ' questions)</li>'
    send(s)
  }
  send('</ul>')
  send(templates.htmlend())
}
