;(function(window, $){

  // Copyright Brian Gonzalez - 2013
  // jquery.arbitrary-anchor.js
  // Arbitrary anchors for any element on your page using a little jQuery magic.
  // briangonzalez.org/arbitrary-anchor
  // @brianmgonzalez

  "use strict";

  var $window, $document, $body, $html, $bodhtml;
  var animationLength = 750;

  // Document ready?
  // Well then do the magic.
  $(document).ready(function(){

    // Grab our elements.
    $window   = $(window);
    $document = $(this);
    $body     = $document.find('body');
    $html     = $document.find('html');
    $bodhtml  = $body.add( $html );  

    // Scroll to the anchor on initial page load.
    scrollToHash();

    // Select all anchors that have an href 
    // that starts with `#`.
    $('a[href^="#"]').on('click', function(){
      var href = $(this).attr('href');

      // only scroll to element if href is equal 
      // to hash; we'll let hashchange event 
      // handle everything else
      if ( href === window.location.hash )
        scrollToHash( href )
    })

    // Scroll to the object when hashchange event
    // is triggered on the window.
    $window.on('hashchange', function(){
      scrollToHash();
    })

    // Cancel scroll if user interacts with page.
    $window.on('mousewheel DOMMouseScroll touchstart mousedown MSPointerDown', function(ev){
      // the true clears the queue
      // the false disables jump-to-end 
      $bodhtml.stop(true, false);  
    });

  })

  function scrollToHash(rawHash){
    var rawHash       = rawHash || window.location.hash;
    var anchorTuple   = rawHash.substring(1)
                               .split("|");

    var hash          = anchorTuple[0];
    var animationTime = anchorTuple[1] || 750;


    // What are valid values for the id attribute?
    // http://stackoverflow.com/questions/70579/what-are-valid-values-for-the-id-attribute-in-html
    if ( hash.charAt(0).search(/[A-Za-z]/) > -1 )
      var $actualID         = $( "#" + hash);

    var $actualAnchor     = $('a[name="'+ hash +'"]');

    // Let the browser handle the default types of anchors.
    // http://stackoverflow.com/questions/484719/html-anchors-with-name-or-id
    if ( ($actualAnchor && $actualAnchor.length > 0) || ($actualID && $actualID.length > 0) )
      return;

    // Store the arbitrary anchor element.
    var $arbitraryAnchor  = $(hash).first();
    if ( $arbitraryAnchor && $arbitraryAnchor.length > 0 ) {
      var $el = $arbitraryAnchor;      
    } else {
      return;
    }

    // Scroll to $el.
    if ( $el && $el.length > 0 ) {
      var top = $el.offset().top;

      $bodhtml.stop(true, false)
              .animate({ scrollTop: top },  parseInt(animationTime) );

    }
  }

})(window, jQuery)