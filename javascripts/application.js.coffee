#= require_self

((w, $) ->
  $doc = $(document)

  Storytelling =
    mailchimp_on: (selector) ->
      $( selector ).submit ->

        self = $(@)
        email = self.find('input[type="email"]').val()
        action = self.attr('action')

        $.ajax
          url: action
          type: 'POST'
          data:
            EMAIL: email

        self.fadeOut 'slow', ->
          heading = self.parent().find( 'h3' )
          thankyou = heading.data('thankyou')
          heading.fadeOut 'slow', ->
            heading.text(thankyou)
            heading.fadeIn 'slow'

        false

    run: ->
      @mailchimp_on( '#subscribe' )
      @

  w.Storytelling = Storytelling
  $doc.ready( Storytelling.run() )
) window, jQuery
