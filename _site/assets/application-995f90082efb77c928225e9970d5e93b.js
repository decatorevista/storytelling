!function(){!function(t,n){var i,r;return i=n(document),r={mailchimp_on:function(t){return n(t).submit(function(){var t,i,r;return r=n(this),i=r.find('input[type="email"]').val(),t=r.attr("action"),n.ajax({url:t,type:"POST",data:{EMAIL:i}}),r.fadeOut("slow",function(){var t,n;return t=r.parent().find("h4"),n=t.data("thankyou"),t.fadeOut("slow",function(){return t.text(n),t.fadeIn("slow")})}),!1})},run:function(){return this.mailchimp_on("#subscribe"),this}},t.Storytelling=r,i.ready(r.run())}(window,jQuery)}.call(this);