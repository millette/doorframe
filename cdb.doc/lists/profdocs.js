function (head, req) {
  var row
  var s
  start({ headers: { 'Content-Type': 'text/html' } })
  send('<ul>')
  while((row = getRow())) {
    log('row:' + JSON.stringify(row))
    s = '<li><a href="/doc/' + row.id + '">' + row.id
    if (row.key[1] === 'last-editor') { s += ' (actuel)' }
    s += '</a></li>'
    send(s)
  }
  send('</ul>')
}
