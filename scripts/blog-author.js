$(document).ready(function() {
    setTimeout(function() {
        initCarouselAuthorList();
    }, 100);
});

function initCarouselAuthorList() {
    $('.author-container').owlCarousel({
        loop: true,
        dots: false,
        nav:true,
        autoplay:true,
        autoplayTimeout: 10000,
        autoplayHoverPause:true,
        responsive: {
            0: {
                margin: 20,
                items: 2
            },
            470: {
                margin: 30,
                items: 3
            },
            768: {
                margin: 40,
                items: 4
            },
            1200: {
                margin: 60,
                items: 4
            }
        }
    });
}