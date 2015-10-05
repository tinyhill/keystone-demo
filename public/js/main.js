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
(function ($, selector) {

    $(selector).lazyload({
        data_attribute: 'src',
        vertical_only: true
    });

})(Zepto, 'img[data-src]');

/**
 * 加载更多
 */
(function ($, selector) {

    var more = $(selector);

    if (!more.get(0)) {
        return;
    }

    var btn = more.find('button');
    var context = $(more.attr('data-context'));
    var tpl = $(more.attr('data-tpl')).html();
    var isReady = true;
    var page = 2;

    function moreRequest() {

        var inViewport = (more.offset().top - $('body').scrollTop()) <= $(window).height();

        isReady && inViewport && $.ajax({
            url: location.search,
            data: {
                page: page
            },
            context: $(context),
            beforeSend: function () {
                btn.text('加载中...');
                isReady = false;
            },
            success: function (html) {
                if (html) {
                    btn.text('加载更多');
                    isReady = true;
                    this.append(html);
                    page = page + 1;
                    moreRequest();
                } else {
                    btn.text('没有了');
                    isReady = false;
                }
            },
            error: function () {
                btn.text('加载更多');
                isReady = true;
            }
        });
    }

    $(window).on('scroll', moreRequest);
    moreRequest();

})(Zepto, '#more');