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
            }).on('tabswitch', function (e) {
                e.$trigger.find('input').prop('checked', true);
            });

            CORE.packageControl();
        },

        packageControl: function () {
            var $group = $('#reg-full .field__controls--special');

            if (!$group.length) {
                return;
            }

            var $inputs = $group.find('input');
            var $controls = $group.find('.control');

            $controls.on('click', function (e){
                var $control = $(this);

                $control.addClass('is-checked').find('input').prop('checked', true);

                $control.siblings().removeClass('is-checked');
            });

        }

    };

    $(document).ready(CORE.onReady);

}(window.jQuery));