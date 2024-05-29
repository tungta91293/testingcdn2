$(document).ready(function() {
    $('.trusted-clients__carousel').owlCarousel({
        loop: true,
        margin: 30,
        dots: true,
        autoplay: true,
        autoplayTimeout: 10000,
        autoplayHoverPause:true,
        responsive: {
            0: {
                nav: false,
                items: 1,
            },
            768: {
                nav: false,
                items: 2,
            },
            992: {
                nav: false,
                items: 3,
            },
            1200: {
                nav: true,
                items: 3,
            }
        }
    });

    $('.trusted-clients__item .read-more').on("click", function () {
        var classText = $(this).attr("data-id");

        if($('.' + classText).hasClass('read-less-text')) {
            $(this).html("Read less <span class='arrow-read-more'></span>");
        } else {
            $(this).html("Read more <span class='arrow-read-more'></span>");
        }

        $('.' + classText).toggleClass('read-less-text');
    });
});
