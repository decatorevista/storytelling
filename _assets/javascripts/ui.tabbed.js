(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery', 'core', 'utils'], factory);
    } else {
        root.UI = root.UI || {};
        root.UI.Tabbed = factory(jQuery, root.UI.Core, root.UI.utils);
    }
}(this, function ($, Core, utils) {

    'use strict';

    var Tabbed = function ($root, o) {
        Core.call(this, $root, o);

        this.NS = 'auc.tabbed'; // event namespace
    };

    Tabbed.prototype = utils.spawnFrom(Core.prototype);

    $.extend(Tabbed.prototype, {

        getPane: function ($trig) {
            var target = $trig.children().attr('href');

            return $(target);
        },

        activate: function () {
            var self = this;

            self.$triggers.on('click.' + self.NS, function (e) {
                e.preventDefault();
                var connID = $(this).data('connID');

                self.$root.trigger({
                    type: 'tabswitch',
                    $trigger: $(this),
                });

                self.focusOn(connID);
            }).filter('.' + self.o.focusClass).click();

            self.$panes.addClass('is-active');
        },

        deactivate: function () {
            var self = this;

            self.purge();
            self.$triggers.off('.' + self.NS);
        }
    });


    // jQuery plugin wrapper
    $.fn.tabbed = function (opts) {
        return this.each(function () {

            var thing = new Tabbed($(this), opts);
            thing.activate();

        });
    };

    return Tabbed;

}));