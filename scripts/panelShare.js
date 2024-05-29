var pageTitle ;
var pageDesc;
var pageUrl = document.location.href;

jQuery(document).ready(function () {
    var currentUrl = window.location.pathname;
    if (currentUrl.indexOf("/blog/vietnam-ranked-number-1-outsourcing-destination") > - 1) {
        pageTitle = "Vietnam Ranked %231 Global Outsourcing Destination by C%26W";
        pageDesc = "Vietnam is now the number 1 outsourcing destination according to Cushman %26 Wakefield 2015 report.";
    } else {
        pageTitle = $('title').html();
        pageDesc = $('meta[name="description"]').attr('content');
    }
    $(".modalPanelShareBlog").css("display", "block");


    $(".blog-panel-share-facebook").click(function popupShareFb() {

        fbShare(pageUrl, pageTitle, pageDesc, '../../Themes/OrientSoftwareTheme/Content/Images/logo_osd.jpg', 600, 400);
    });

    $(".blog-panel-share-twitter").click(function popupShareTwitter() {
        TwitterShare(pageUrl, pageTitle, 'OrientInfo ', 600, 400);
    });

    $(".blog-panel-share-linkedin").click(function popupShareTwitter() {
        var source = "Orient Software Development Company";
        LinkedInShare(pageUrl, pageTitle, pageDesc, source, 600, 600);
    });

});
function fbShare(url, title, descr, image, winWidth, winHeight) {
    var winTop = (screen.height / 2) - (winHeight / 2);
    var winLeft = (screen.width / 2) - (winWidth / 2);
    window.open('http://www.facebook.com/sharer.php?s=100&p[title]=' + title + '&p[summary]=' + descr + '&p[url]=' + url + '&p[images][0]=' + image, 'sharer', 'top=' + winTop + ',left=' + winLeft + ',toolbar=0,status=0,width=' + winWidth + ',height=' + winHeight);
};

function TwitterShare(url, text, via, winWidth, winHeight) {
    var winTop = (screen.height / 2) - (winHeight / 2);
    var winLeft = (screen.width / 2) - (winWidth / 2);
    window.open('http://twitter.com/share?url=' + url + '&text=' + text + '&via=' + via, 'sharer', 'top=' + winTop + ',left=' + winLeft + ',toolbar=0,status=0,width=' + winWidth + ',height=' + winHeight);
};

function LinkedInShare(url, title, summary, source, winWidth, winHeight) {
    var winTop = (screen.height / 2) - (winHeight / 2);
    var winLeft = (screen.width / 2) - (winWidth / 2);
    window.open('https://www.linkedin.com/shareArticle?mini=true&url=' + url + '&title=' + title + '&summary=' + summary + '&source=' + source, 'sharer', 'top=' + winTop + ',left=' + winLeft + ',toolbar=0,status=0,width=' + winWidth + ',height=' + winHeight);
};
