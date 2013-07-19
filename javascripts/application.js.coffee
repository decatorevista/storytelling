#= require_self

((w, $) ->
  $doc = $(document)

  Storytelling =
    parallax_on: (selector) ->
      _w = $(w)
      $(selector).each ->
        self = $(this)
        offset = self.offset()

        _w.scroll ->
          if _w.scrollTop() + _w.height() > offset.top and offset.top + self.height() > _w.scrollTop()
            yPos = -(_w.scrollTop() / self.data('speed'))

            if self.data('offset-y')
              yPos += self.data('offset-y')

            self.css {backgroundPositionY: yPos + 'px'}

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
          heading = self.parent().find( '.ty' )
          thankyou = heading.data('thankyou')
          heading.fadeOut 'slow', ->
            heading.text(thankyou)
            heading.fadeIn 'slow'

        false

    run: ->
      @parallax_on( 'body .light' )
      @parallax_on( 'body .highlight' )
      @mailchimp_on( '#last-subscribe' )
      @

  w.Storytelling = Storytelling
  $doc.ready( Storytelling.run() )
) window, jQuery
