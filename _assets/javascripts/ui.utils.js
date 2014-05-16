(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else {
        root.UI = root.UI || {};
        root.UI.utils = factory(jQuery);
    }
}(this, function ($) {

    'use strict';

    var spawnFrom = function (o) {
            function F() {}
            F.prototype = o;
            return new F();
        },

        respond = function (mql, callback) {
            callback.call(undefined, mql);
            mql.addListener(callback);
        };

    return {
        spawnFrom: spawnFrom,
        respond: respond
    };

}));