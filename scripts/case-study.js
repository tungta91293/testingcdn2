$(document).ready(function(e) {
    initCaseStudyOwlCarousel();

    if(isCaseStudyDetail()) {
        transparentHeaderOnMobileCaseStudy();
    }
});

$(window).resize(function() {
    initCaseStudyOwlCarousel();

    if(isCaseStudyDetail()) {
        transparentHeaderOnMobileCaseStudy();
    }
});

function initCaseStudyOwlCarousel() {
    $('.case-study-detail__related-post__carousel').addClass("owl-carousel");
    $('.case-study-detail__related-post__carousel').owlCarousel({
        loop: true,
        margin: 30,
        center: true,
        autoplay:true,
        autoplayHoverPause:true,
        responsive: {
            0: {
                items: 1,
                nav: false,
                dots: true,
            },
            600: {
                items: 2,
                center: false,
                nav: false,
                dots: true,
            },
            992: {
                items: 3,
                nav: false,
                dots: true
            }
        }

    });
}

function transparentHeaderOnMobileCaseStudy() {
    if($(window).width() <= 992) {
        $("#header-container").removeClass("white-header");
    }else {
        $("#header-container").addClass("white-header");
    }
}

function isCaseStudyDetail() {
    var currentPage = window.location.pathname;
    return currentPage.includes("case-studies") && currentPage != "/case-studies/";
}
