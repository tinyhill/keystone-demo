/**
 * 顶部菜单收缩
 */
(function ($, selector) {

    var toggle = $(selector);
    var nav = $('#navbar-collapse');
    var mask = $('#navbar-mask');

    if (!toggle) {
        return;
    }

    toggle.tap(function () {

        var newHeight = Math.max($(window).height(), $('html').height()) - 45;

        if (nav.height() !== newHeight) {
            nav.height(newHeight);
        }
        $(this).toggleClass('navbar-collapsed');
        nav.toggle();
    });

    mask.tap(function () {
        toggle.trigger('tap');
    });

})(Zepto, '#navbar-toggle');