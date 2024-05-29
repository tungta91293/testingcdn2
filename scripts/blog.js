$(document).ready(function () {
    initBlogCategoriesCarousel();

    $(window).resize(function () {
        initBlogCategoriesCarousel();
    });

});

function initBlogCategoriesCarousel() {
    $('.blog-categories__carousel').owlCarousel({
        loop: false,
        margin: 15,
        dots: false,
        nav: false,
        items: 3,
        autoWidth:true,
        responsive: {
            0: {
                items: 3
            },
            992: {
                items: 4
            },
            1125: {
                items: 6
            }
        }
    });
}
