(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery', 'core', 'utils'], factory);
    } else {
        root.UI = root.UI || {};
        root.UI.Dropdown = factory(jQuery, root.UI.Core, root.UI.utils);
    }
}(this, function ($, Core, utils) {

    'use strict';

    var Dropdown = function ($root, o) {
        Core.call(this, $root, o);

        this.NS = 'auc.dropdown'; // event namespace
    };

    Dropdown.prototype = utils.spawnFrom(Core.prototype);

    $.extend(Dropdown.prototype, {

        activate: function () {
            var self = this;

            self.$triggers.on('click.' + self.NS, function (e) {

                var connID = $(this).data('connID');

                if (self.connections[connID].pane !== false) {
                    e.preventDefault();
                }

                if (self.inFocus[connID]) {
                    self.focusOff(connID);
                } else {
                    self.focusOn(connID);
                }
            });

            // click outside
            $('body').on('click.' + self.NS, function (e) {
                var n = self.inFocus.length;

                if (n && $(e.target).closest(self.$root).length === 0) {
                    while (n--) {
                        if (self.inFocus[n]) {
                            self.focusOff(n);
                        }
                    }
                }
            });
        },

        deactivate: function () {
            var self = this;

            self.purge();
            self.$triggers.off('.' + self.NS);
            $('body').off('.' + self.NS);
        }
    });

    // jQuery plugin wrapper
    $.fn.dropdown = function (opts) {
        return this.each(function () {

            var thing = new Dropdown($(this), opts);
            thing.activate();

        });
    };

    return Dropdown;
}));
