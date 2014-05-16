(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else {
        root.UI = root.UI || {};
        root.UI.Core = factory(jQuery);
    }
}(this, function ($) {

    'use strict';

    var Core = function ($root, o) {

        o = $.extend(true, {
            selectors: {
                trigger: 'trigger',
                pane: 'pane'
            },
            focusClass: 'is-focused',
            activeClass: 'is-active',
            focusOnParent: false,
            focusRestricted: true,
            getConnection: false
        }, o);

        this.o = o;

        this.$root = $root;

        var base = $root.data('base'), //should be named better
            toggle = $root.data('toggle'),

            // selectors by default
            triggerFilter = o.selectors.trigger,
            paneFilter = o.selectors.pane;

        // control names when toggled via data API
        if (toggle) {
            var controlHook = base !== undefined ? toggle + '-control' : 'control';

            triggerFilter = '[data-' + controlHook + '="' + o.selectors.trigger + '"]';
            paneFilter = '[data-' + controlHook + '="' + o.selectors.pane + '"]';
        }

        this.filters = {
            trigger: triggerFilter,
            pane: paneFilter
        };

        this.$triggers = $root.find(triggerFilter).add($root.filter(triggerFilter));
        this.$panes = $root.find(paneFilter);

        this.inFocus = [];
        this.focusTree = [];

        this.connections = this.scanConnections();
    };

    Core.prototype = {

        getPane: function ($trig) {
            return $trig.next();
        },

        scanConnections: function () {
            var self = this,
                o = self.o;

            return $.map(self.$triggers, function (trig, index) {

                var $trig = $(trig),
                    $pane = o.getConnection === false ? self.getPane($trig) : o.getConnection.apply(self, $trig),
                    $focusTarget = o.focusOnParent ? $pane.parent() : $pane.add($trig),

                    level = $trig.parentsUntil(self.$root, o.selectors.pane).length,
                    focused = $focusTarget.eq(0).hasClass(o.focusClass);

                if (o.focusRestricted && focused) {
                    self.focusTree[level] = index;
                }

                self.inFocus[index] = focused ? true : false;

                return {
                    trigger: $trig.data('connID', index),
                    pane: $pane.length ? $pane.data('connID', index) : false,
                    focusTarget: $focusTarget,
                    level: level
                };
            });
        },

        restrictFocus: function (connID) {
            var self = this,
                level = self.connections[connID].level,
                current = self.focusTree[level];

            if (current !== undefined) {
                self.focusOff(current);
                delete self.focusTree[level];
            }

            self.focusTree[level] = connID;
        },

        focusOn: function (connID) {
            var self = this,
                connection = self.connections[connID];

            if (self.o.focusRestricted === true) {
                self.restrictFocus(connID);
            }

            if (self.inFocus[connID] === true || connection.pane === false) {
                return false;
            }

            self.inFocus[connID] = true;

            connection.focusTarget.addClass(self.o.focusClass);
        },

        focusOff: function (connID) {
            var self = this,
                connection = self.connections[connID];

            if (self.inFocus[connID] === false || connection.pane === false) {
                return false;
            }

            self.inFocus[connID] = false;

            connection.focusTarget.removeClass(self.o.focusClass);
        },

        purge: function () {
            var self = this,
                n = self.inFocus.length;

            while (n--) {
                if (self.inFocus[n]) {
                    self.connections[n].focusTarget.removeClass(self.o.focusClass).removeClass(self.o.activeClass);
                    self.inFocus[n] = false;
                }
            }

            self.focusTree = [];
        },

        deactivate: function () {
            // to be defined when extending
        },

        activate: function () {
            // to be defined when extending
        }
    };


    return Core;
}));
