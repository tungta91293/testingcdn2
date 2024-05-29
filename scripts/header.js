const mediaBreakPoint = 1129;
const defaultPosition = 0;

$(document).ready(function () {
    antiClickJack();

    $(document).on('click', '.dropdown-menu', function (e) {
        e.stopPropagation();
    });

    $(".dropdown-menu, .header-container").on("mouseleave", function() {
        hideDropdownMenu();
    });

    changeMenuBackGroundOnScroll();
});

function antiClickJack() {
    if(window.self !== window.top) {
        $("html").remove();
    }
}

function onShowDropdownMenu() {
    addClassForElement('header-container', 'show-dropdown-menu');
}

function hideDropdownMenu() {
    removeClassOfElement('header-container', 'show-dropdown-menu');
    removeClassOfElement('megamenu', 'show');
    removeClassOfElement('dropdown', 'show');
    removeClassOfElement('dropdown-menu', 'show');
}

function addClassForElement(targetClass, classToAdd) {
    $('.' + targetClass).addClass(classToAdd);
}

function removeClassOfElement(targetClass, classToRemove) {
    $('.' + targetClass).removeClass(classToRemove);
}

//BEGIN HIDE MENU ON SCROLL DOWN//
function changeMenuBackGroundOnScroll() {
    var topScrollPos = 500;
    var navBar = $(".header-container");

    if ($(document).scrollTop() >= 100) {
        navBar.addClass("on-scroll-background");
    }
    window.onscroll = function () {
        var currentScrollPos = $(document).scrollTop();

        if (currentScrollPos <= topScrollPos) {
            $(".osd-tab__nav").addClass("osd-tab__nav--sticky-on-scroll");
        } else if (currentScrollPos > 15){
            $(".osd-tab__nav").removeClass("osd-tab__nav--sticky-on-scroll");
        }

        navBar.addClass("on-scroll-background");

        if (currentScrollPos < 100) {
            navBar.removeClass("on-scroll-background");
        }
        topScrollPos = currentScrollPos;
    }
}
//END HIDE MENU ON SCROLL DOWN//



//BEGIN SHOW MENU ON MOBILE DEVICE//
$(window).resize(function() {
    if($(window).width() <= mediaBreakPoint) {
        hideDropdownMenu();
    }else {
        hideMobileMenu();
        hideDropdownMenu();
    }
});

function onShowMobileMenuClick() {
    var navBar = $("#header-container");

    if (!navBar.hasClass("responsive")) {
        showMobileMenu();
    } else {
        hideMobileMenu();
        hideDropdownMenu();
    }
}

function showMobileMenu() {
    var html = document.getElementsByTagName("html");

    $("#header-container").addClass("responsive");
    $("#nav-icon").addClass("open");
    html[0].style.overflowY = "hidden";
}

function hideMobileMenu() {
    var html = document.getElementsByTagName("html");

    $("#header-container").removeClass("responsive");
    $("#nav-icon").removeClass("open");
    html[0].style.overflowY = "";
}

//END SHOW MENU ON MOBILE DEVICE//


function goToPage(pageUrl) {
    window.location = pageUrl;
}
