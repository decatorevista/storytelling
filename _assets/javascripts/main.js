//= require ./ui.utils
//= require ./ui.core
//= require ./ui.dropdown
//= require ./ui.tabbed
//= require ./ui.offscreen
//= require_self

(function ($) {

    'use strict';

    // we keep all MQs here
    var MQ = {
        menu: window.matchMedia('(min-width: 50em)')
    };

    var CORE = {

        onReady: function () {

            //CORE.manageMenus(MQ.menu);

            $('[data-toggle="offscreen"]').offscreen();
            $('.dropdown').dropdown({
                selectors: {
                    trigger: '.dropdown__trig',
                    pane: '.dropdown__pane'
                }
            });

            $('.tabbed').tabbed({
                selectors: {
                    trigger: '.tabbed__trig',
                    pane: '.tabbed__pane'
                }
            });
        },

    };

    $(document).ready(CORE.onReady);

}(window.jQuery));