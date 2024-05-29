$(window).ready(function () {
    openTabs();
    setInlineMenuWidth();
    var timeout = false;
    $(window).resize(function () {
        if (timeout !== false) {
            clearTimeout(timeout);
        }
        timeout = setTimeout(setInlineMenuWidth, 500);
    });
});

function openTabs() {
    $("#software-architecture__tabs .row:first-child .tab-title h3").addClass("active");
    $("#software-architecture__tabs .row:first-child .tab-content").show();
    $("#software-architecture__tabs .row:first-child .tab-img").show();

    $("#software-architecture__tabs .tab-title").click(function () {
        $("#software-architecture__tabs .tab-title h3").removeClass("active");
        $("#software-architecture__tabs .tab-content").stop().slideUp("500");
        $("#software-architecture__tabs .tab-img").stop().slideUp("500");

        $(this).parent(".tab").find(".tab-content").stop().slideDown("500");
        $(this).find("h3").addClass("active");
        $(this).parent(".tab").siblings(".tab-img").stop().slideDown("500");
    });
}

function setInlineMenuWidth() {
    if($(window).width() > 992) {
        $("#inline-menu .card").each(function (index, element) {
            var childWidth = $(this).children(".card-header").children().children(".btn-link").width();
            $(this).width(childWidth + 40);
        });
    }else {
        $("#inline-menu .card").css("width","auto");
    }
}
