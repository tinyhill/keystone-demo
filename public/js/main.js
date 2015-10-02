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

/**
 * 图片轮播控制
 */
(function ($, selector) {

    var carousel = $(selector);

    if (!carousel) {
        return;
    }

    var swipe = new Swipe(carousel.get(0), {
        auto: 5000,
        continuous: false,
        callback: function (idx) {

            var curItem = $('li:nth-child(' + ++idx + ')', carousel);
            var curImg = $('img', curItem);

            curItem.addClass('active')
                .siblings()
                .removeClass('active');

            if (curImg.attr('data-src')) {
                curImg.attr('src', curImg.attr('data-src'));
            }
        }
    });

    var i = 0;
    var num = swipe.getNumSlides();
    var items = [];

    for (; num > 1 && i < num; i++) {
        items.push('<li class="item' + (i === 0 ? ' active' : '') + '">' + i + '</li>');
    }
    carousel.append('<ul class="carousel-indicators">' +
        items.join('') +
        '</ul>');

})(Zepto, '#carousel');