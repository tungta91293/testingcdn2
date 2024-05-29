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
});
