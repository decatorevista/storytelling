(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else {
        root.UI = root.UI || {};
        root.UI.Offscreen = factory(jQuery);
    }
}(this, function ($) {

    'use strict';

    var Offscreen = function ($root, o) {

        o = $.extend(true, {
            trigger: '[data-offscreen-control="trigger"]',
            pane: '[data-offscreen-control="pane"]',
            nav: '[data-offscreen-control="nav"]',
            activeClass: 'is-active',
            focusClass: 'is-focused'
        }, o);

        this.o = o;
        this.$root = $root;

        this.$trig = $(o.trigger, $root);
        this.$pane = $(o.pane, $root);
        this.$nav = $(o.nav, $root);

        this.NS = 'ui.offscreen';
        this.inFocus = false;
    };

    Offscreen.prototype = {

        activate: function () {
            var self = this,
                o = this.o;

            self.$pane.add(self.$nav).addClass(o.activeClass);

            self.$trig.on('click.' + self.NS, function (e) {
                e.preventDefault();

                if (!self.inFocus) {
                    self.$pane.add(self.$trig).addClass(o.focusClass);
                    self.inFocus = true;
                } else {
                    self.$pane.add(self.$trig).removeClass(o.focusClass);
                    self.inFocus = false;
                }

                e.stopPropagation();
            });

            // click outside
            $('body').on('click.' + self.NS, function (e) {
                if (self.inFocus && $(e.target).closest(self.$nav).length === 0) {
                    self.$pane.add(self.$trig).removeClass(self.o.focusClass);
                    self.inFocus = false;
                }
            });
        },

        deactivate: function () {
            var self = this;

            self.$pane.add(self.$trig).removeClass(self.o.focusClass);
            self.$pane.add(self.$nav).removeClass(self.o.activeClass);

            self.$trig.off('.' + self.NS);
            $('body').off('.' + self.NS);

            self.inFocus = false;
        }
    };

    // jQuery plugin wrapper
    $.fn.offscreen = function (opts) {
        return this.each(function () {
            var thing = new Offscreen($(this), opts);
            thing.activate();
        });
    };

    return Offscreen;

}));
