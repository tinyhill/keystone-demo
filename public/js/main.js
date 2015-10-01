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
        callback: function (idx) {

            var cur = $('li:nth-child(' + ++idx + ')', carousel);
            var curImg = $('img', cur);

            cur.addClass('active')
                .siblings().removeClass('active');

            if (curImg.attr('data-src')) {
                curImg.attr('src', curImg.attr('data-src'))
                    .removeAttr('data-src');
            }
        }
    });
    var lis = [];
    var num = swipe.getNumSlides();

    // 强制设置3：2的宽高模式 多出来的隐藏
    var winWidth = $(window).width();
    winWidth = winWidth > 660 ? 660 : winWidth;
    var height = 2 * winWidth / 3;
    carousel.css({height: height + 'px'});

    for (var i = 0; num > 1 && i < num; i++) {
        lis.push('<li' + (i === 0 ? ' class="active"' : '') + '>' + i + '</li>');
    }
    carousel.append('<ul class="carousel-indicators">' +
        lis.join('') +
        '</ul>');

})(Zepto, '#post-carousel');