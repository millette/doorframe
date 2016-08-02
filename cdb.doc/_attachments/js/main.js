$(function () {
  $(document).foundation()

  $('input[name=choice]').on('change', function () {
    $('input[name=choice]').each(function () { $(this).parents('label').removeClass('primary') })
    $(this).parents('label').addClass('primary')
  })

  $('textarea').on('keyup', _.debounce(function () {
    $('#preview').text($('textarea').val())
    MathJax.Hub.Queue(['Typeset', MathJax.Hub, 'preview'])
  }, 500))

  $('#logout').submit(function (ev) {
    var $form = $(this)
    ev.preventDefault()
    $.ajax({
      url: '/session',
      accepts: 'application/json',
      contentType: 'application/json',
      type: 'DELETE'
    })
      .done(function (resp) { window.location = '/' })
      .fail(function (resp) {
        console.log('FAIL2:', resp)
        $form.after('<pre>' + JSON.stringify(resp, null, ' ') + '</pre>')
      })
  })

  $('#login').submit(function (ev) {
    var data = {
      password: '' + Math.random(),
      roles: [],
      type: 'user'
    }

    var $form = $(this)
    var data2

    $form.serializeArray().forEach(function (x) { data[x.name] = x.value })
    ev.preventDefault()

    data2 = {
      password: data.password,
      name: data.name
    }

    ev.preventDefault()
    console.log('submitting:', data)
    $.ajax({
      url: '/login/org.couchdb.user:' + data.name,
      accepts: 'application/json',
      dataType: 'json',
      contentType: 'application/json',
      data: JSON.stringify(data),
      type: 'PUT'
    })
      .done(function (resp) {
        // console.log('DONE', Object.keys(resp))
        // console.log(resp)
        $.ajax({
          url: '/session',
          accepts: 'application/json',
          dataType: 'json',
          contentType: 'application/json',
          data: JSON.stringify(data2),
          type: 'POST'
        })
          .done(function (resp) {
            $form.remove()
            $('body').prepend('<div>Hello ' + resp.name + '</div>')
            // console.log('DONE2', Object.keys(resp))
            console.log('RESP:', resp)
            console.log('COO:', document.cookie)
            window.location = '/'
          })
          .fail(function (resp) {
            // console.log('FAIL2', Object.keys(resp))
            console.log('FAIL2:', resp)
            $form.after('<pre>' + JSON.stringify(resp, null, ' ') + '</pre>')
          })
      })
      .fail(function (resp) {
        // console.log('FAIL', Object.keys(resp))
        console.log('FAIL3', resp)
        $form.after('<pre>' + JSON.stringify(resp, null, ' ') + '</pre>')
      })
  })
})
