/**
 * 顶部菜单收缩
 */
(function ($, selector) {

    var toggle = $(selector);
    var nav = $('#navbar-collapse');
    var mask = $('#navbar-mask');

    if (!toggle.get(0)) {
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

    if (!carousel.get(0)) {
        return;
    }

    var swipe = new Swipe(carousel.get(0), {
        auto: 5000,
        disableScroll: true,
        callback: function (idx) {

            var curItems = $('li:nth-child(' + ++idx + ')', carousel);
            var curImg = $('img', curItems);

            curItems.addClass('active')
                .siblings()
                .removeClass('active');

            if (curImg.attr('data-src')) {
                curImg.attr('src', curImg.attr('data-src'));
            }
        }
    });

    var i = 0;
    var totalSlides = swipe.getNumSlides();
    var items = [];

    for (; totalSlides > 1 && i < totalSlides; i++) {
        items.push('<li class="item' + (i === 0 ? ' active' : '') + '">' + i + '</li>');
    }
    carousel.append('<ul class="carousel-indicators">' +
        items.join('') +
        '</ul>');

})(Zepto, '#carousel');

/**
 * 图片懒加载
 */
(function ($) {

    $('img[data-src]').lazyload({
        threshold: 100,
        data_attribute: 'src'
    });

})(Zepto);