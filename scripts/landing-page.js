var title = $("#first-title");
var currentTitleHeight = $(title).height();

$(window).resize(function () {
    if(currentTitleHeight < $(title).height())
    {
        $(title).css("margin-bottom","20px");
    }
    else{
        $(title).css("margin-bottom","0");
    }
});

$(window).scroll(function () {
    var currentScrollPos = window.pageYOffset;

    if (currentScrollPos >= 500) {
        $(".landing-page__header").addClass("--white-background");
    } else {
        $(".landing-page__header").removeClass("--white-background");
    }
});
