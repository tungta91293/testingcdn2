$(document).ready(function () {
    var tabToOpen = window.location.hash.slice(5);
    $('#scroll-marker a[href="#' + tabToOpen + '"]').tab('show');

    window.onhashchange = function () {
        var tabChange = window.location.hash.slice(5);
        $('#scroll-marker a[href="#' + tabChange + '"]').tab('show');
    };
});
