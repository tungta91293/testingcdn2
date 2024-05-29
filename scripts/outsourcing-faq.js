$(document).ready(function(e) {
    openFAQTabContentOnDropdownClick();
});

function openFAQTabContentOnDropdownClick() {
    $("#nav-tabs-dropdown .dropdown-item").click(function () {
        $(".tab-pane").removeClass("in active show");
        $("a.osd-tab__category").removeClass("active show");

        var href = $(this).attr("data-id");
        $(href).addClass("in active show");
        $("a[href='"+ href +"']").addClass("active show");
        $("#nav-tabs-dropdown .dropdown-toggle").text($(this).text() + " ");

        scrollToMarker ();
    });

    $("a.osd-tab__category").click(function () {
        $("#nav-tabs-dropdown .dropdown-toggle").text($(this).text() + " ");
        scrollToMarker ();
    });
}

function scrollToMarker () {
    var scrollMarker = $("#scroll-marker").position().top - 60;
    if($(document).scrollTop() > scrollMarker) {
        $(document).scrollTop(scrollMarker);
    }
}
