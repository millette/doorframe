/* global $, sortable, MathJax, _ */
$(function () {
  var $question = $('textarea[name=question]')

  if ($('.examreorder').length) {
    var exam = $('.examreorder').data('exam')
    sortable('.examreorder')
    $('.examreorder').on('sortupdate', function (ev) {
      var pprev
      var pnext
      var pos
      var u

      pprev = $(ev.detail.item.previousSibling).data('position') || 1
      pnext = $(ev.detail.item.nextSibling).data('position') || 1000
      pos = Math.round((pnext + pprev) / 2)
      console.log('prev', pprev, ev.detail.item.previousSibling)
      console.log('next', pnext, ev.detail.item.nextSibling)
      console.log('pos:', pos)
      $(ev.detail.item).data('position', pos)
      u = '/position/' + exam + '/' + $(ev.detail.item).data('id') + '/' + pos
      console.log('URL:', u)
      $.ajax({
        url: u,
        accepts: 'application/json',
        dataType: 'json',
        contentType: 'application/json',
        type: 'POST'
      })
        .done(function (resp) {
          console.log('REORDERED:', resp)
        })
        .fail(function (resp) {
          console.log('FAIL83:', resp)
        })
    })
  }

  if ($('.ajaxeduser').length) {
    $.ajax({
      url: '/login/org.couchdb.user:' + $('.ajaxeduser').data('user'),
      accepts: 'application/json',
      dataType: 'json',
      contentType: 'application/json'
    })
      .done(function (userDoc) {
        var exam = $('.ajaxeduser').data('exam')
        var k = Object.keys(userDoc.answers[exam])
        var r
        var correctes = 0
        for (r = 0; r < k.length; ++r) {
          if (userDoc.answers[exam][k[r]].correct || userDoc.answers[exam][k[r]].corrent) { ++correctes }
        }
        var str = '<p>Score: <span class="stat">' + Math.round(100 * correctes / userDoc.answers[exam].n_questions) + '%</span></p>'
        str += '<p>Nombre de questions de l\'examen: <span class="stat">' + userDoc.answers[exam].n_questions + '</span></p>'
        str += '<p>Nombre de questions auxquelles on a répondu: <span class="stat">' + k.length + '</span></p>'
        str += '<p>Réponses correctes: <span class="stat">' + correctes + '</span></p>'
        str += '<pre>' + JSON.stringify(userDoc.answers[exam], null, ' ') + '</pre>'
        $('.ajaxeduser').html(str)
      })
    .fail(function (resp) {
      console.log('FAIL59:', resp)
      // $form.after('<pre>' + JSON.stringify(resp, null, ' ') + '</pre>')
    })
  }

  $('.quiz').submit(function (ev) {
    var $form = $(this)
    var username = $('#quizpage').data('user')
    var nQuestions = $('form.quiz', '#quizpage').length

    ev.preventDefault()
    console.log('quizzed!', username, nQuestions)

    $.ajax({
      url: '/login/org.couchdb.user:' + username,
      accepts: 'application/json',
      dataType: 'json',
      contentType: 'application/json'
    })
      .done(function (userDoc) {
        var answer = {}
        $form.serializeArray().forEach(function (p) { answer[p.name] = p.value })
        console.log('RESPUSER:', userDoc)
        if (!userDoc.answers) {
          userDoc.answers = { }
        }
        if (!userDoc.answers[answer.exam]) {
          userDoc.answers[answer.exam] = { n_questions: nQuestions }
        } else if (!userDoc.answers[answer.exam].n_questions) {
          userDoc.answers[answer.exam].n_questions = nQuestions
        }
        if (userDoc.answers[answer.exam][answer.id]) {
          // already responded to this question in this exam!
          console.log('déjà répondu à ' + answer.id + ' dans ' + answer.exam +
            ' le ' + userDoc.answers[answer.exam][answer.id].created_at)
          return
        }
        userDoc.answers[answer.exam][answer.id] = { created_at: new Date().toISOString() }
        if (answer.choice) {
          userDoc.answers[answer.exam][answer.id].response = parseInt(answer.choice, 10)
        } else {
          userDoc.answers[answer.exam][answer.id].response = answer.answer
        }
        // console.log('USERDOC:', userDoc)

        $.ajax({
          url: '/verifymulti/' + answer.id + '/' + answer.choice,
          accepts: 'application/json',
          dataType: 'json',
          contentType: 'application/json'
        })
          .done(function (resp) {
            // console.log('VERIFY:', resp.rows.length)
            userDoc.answers[answer.exam][answer.id].correct = resp.rows.length === 1

            $.ajax({
              url: '/login/org.couchdb.user:' + username,
              accepts: 'application/json',
              dataType: 'json',
              contentType: 'application/json',
              data: JSON.stringify(userDoc),
              type: 'PUT'
            })
              .done(function (resp) {
                $('input[type=submit]', $form)
                  .blur()
                  .addClass('alert')
                  .addClass('disabled')
                  .val('Répondu!')
                $('input', $form).prop('disabled', true)
              })
              .fail(function (resp) {
                console.log('FAIL3:', resp)
                $form.after('<pre>' + JSON.stringify(resp, null, ' ') + '</pre>')
              })
          })
          .fail(function (resp) {
            console.log('FAIL33:', resp)
            // $form.after('<pre>' + JSON.stringify(resp, null, ' ') + '</pre>')
          })
      })
      .fail(function (resp) {
        console.log('FAIL9:', resp)
        // $form.after('<pre>' + JSON.stringify(resp, null, ' ') + '</pre>')
      })
  })

  $(document).foundation()

  $('input[name=choice]').on('change', function () {
    $(this).parents('.choices').each(function () {
      $('.callout', this).removeClass('primary')
    })
    $(this).parent().addClass('primary')
  })

  if ($question) {
    $question.on('keyup', _.debounce(function () {
      $('#preview').text($question.val())
      MathJax.Hub.Queue(['Typeset', MathJax.Hub, 'preview'])
    }, 600))
  }

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
            // console.log('COO:', document.cookie)
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
