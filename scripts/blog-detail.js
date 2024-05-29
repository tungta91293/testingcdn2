var readingTime = 0;
$(document).ready(function() {
    initSharePanel();
    setClassForToCItemOnScroll();
    setClassForToCItemOnClick();

    readingTime = calculateReadingTime();
});

function initSharePanel() {
    var blogContentPosTop = 0;
    var blogContentPosBottom = 0;
    const offset = 60;

    setTimeout(function() {
        blogContentPosTop = $("#blog-content").offset().top;
    }, 500);

    $(document).scroll(function () {
        var scrollPos = $(document).scrollTop() + offset;

        blogContentPosBottom = setContentPosBottom("#blog-content");

        if(blogContentPosTop < scrollPos && blogContentPosBottom >= scrollPos) {
            $(".article-detail__fixed-part").addClass("sticky");
        }else{
            $(".article-detail__fixed-part").removeClass("sticky");
        }

        const offsetAdsBanner = 500;
        if((blogContentPosBottom - offsetAdsBanner) < scrollPos) {
            $("#sharePanel .article-detail__ads-image").css("opacity","0").css("z-index","-1");
        } else {
            $("#sharePanel .article-detail__ads-image").css("opacity","1").css("z-index","1");
        }

        scrollProgressBar(scrollPos, blogContentPosBottom);
    });
}

function scrollProgressBar(scrollPos, blogContentPosBottom) {
    const progressBarLength = 490;

    $(window).resize(function(){
        blogContentPosBottom = setContentPosBottom("#blog-content");
    });

    var percentRead = Math.trunc((scrollPos * 100)/blogContentPosBottom);
    var progressOffset = (percentRead * progressBarLength)/100;
    var remainingReadingTime = Math.trunc((scrollPos * readingTime)/blogContentPosBottom);

    $('#progress-number').text((readingTime - remainingReadingTime) + " min");
    $('#progress-bar').css('stroke-dashoffset', progressBarLength - progressOffset);

}

function calculateReadingTime() {
    const text = $(".article-detail").text();
    const wordPerMin = 225;
    const wordCount = text.trim().split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / wordPerMin);

    $('#progress-number').text(readingTime + " min");
    return readingTime;
}

function setContentPosBottom(elementId) {
    const offset = 500;
    return $(elementId).offset().top + $(elementId).height() - offset;
}

function setPaddingTopForSharePanel() {
    var paddingTop = 100;
    if($(window).width() <= 1200) {
        paddingTop = 80;
    }else {
        paddingTop = 100;
    }
    return paddingTop;
}

function getSectionId() {
    var sectionIds = $("#content-map a").map(function () {
        return $(this).attr("href");
    }).get();

    return sectionIds;
}

function setClassForToCItemOnScroll() {
    var sectionIDs = getSectionId();
    var contentPosBottom = 0;
    const offset = 150;

    $(document).scroll(function () {
        contentPosBottom = setContentPosBottom("#blog-content");
        var scrollPos = $(document).scrollTop() + offset;
        sectionIDs.forEach(function(id) {
            var anchorEl = $("a[href=\"" + id + "\"");
            if($(id).offset().top < scrollPos && scrollPos < contentPosBottom) {
                $("#content-map li a").removeClass("active");
                anchorEl.addClass("active");
            }
        });
    });
}

function setClassForToCItemOnClick() {
    const offset = 100;
    $("#content-map a").click(function(e) {
        e.preventDefault();
        var id = $(this).attr("href");
        $(window).scrollTop($(id).offset().top - offset);
    });
}
