(function ($) {
    $.fn.sliderNav = function (options) {
        var defaults = {
        }
        //页面刷新
        $("html, body").animate({ scrollTop: 0 }, 200);
        var options = $.extend(defaults, options);
        var list = this;
        var listTopOffset = list.offset().top;
        var titleHeight = $(this).find("li:first a.jianpin").height() -1;
        $(window).on("scroll", function () {

            if ($(".header") && $(".header").attr("style") == "display: block;") {
                listTopOffset = list.offset().top;
            }

            if ($(window).scrollTop() < ($("#slider-content ul li a:first").offset().top - 90)) {
                clearFixed();
            } else {
                var li = list.find('li ul li');
                var len = li.length;
                for (var i = 0; i < len ; i++) {
                    if (isOnSight(li[i])) {
                        clearFixed().filter('.fixedTop').remove();
                        if ($(".header") && $(".header").attr("style") == "display: none;") {
                            listTopOffset = "48px";
                        }
                        li.eq(i).parent().prev().clone(true).addClass('fixedTop').css({
                            'top': listTopOffset -1,
                            'position': 'fixed'
                        }).appendTo(list);
                        break;
                    }
                }
            }
        });
        var isOnSight = function (item) {
            return $(window).scrollTop() < $(item).offset().top + $(item).outerHeight() - listTopOffset;
        }
        var clearFixed = function () {
            return $(list).find("ul:first").siblings("a.jianpin").css({ 'position': '', 'display': 'none' });
        }
        
        var KTGJArray = [];
        $(this).find("ul:first a.jianpin").each(function () {
            if ($.inArray($(this).attr("name"), KTGJArray) == -1) {
                KTGJArray.push($(this).attr("name").substr(0,2));
            }
        });
        $(list).append('<div class="slider-nav"><ul></ul></div>');
        for (var i = 0; i < KTGJArray.length; i++) {
            $('.slider-nav ul', $(list)).append("<li id='" + KTGJArray[i] + "'>" + KTGJArray[i] + "</li>");
        }
        $('.slider-nav li', $(list)).on("click", function () {
            var target = $(this).attr("id").substr(0, 2);
            var offsetTop = $("li[id='" + target + "']", $(list).find("ul:first")).offset().top - listTopOffset;       
            $('html,body').stop().animate({ scrollTop: offsetTop }, 300);
        });
    };
})(jQuery)
//$(function () {
//    setTimeout(function () {
//        $('#slider-content').sliderNav();
//    }, 300);
//})