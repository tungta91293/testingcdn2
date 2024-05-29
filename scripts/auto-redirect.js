$(document).ready(function () {
    var counter = 10;

    setInterval(function() {
        counter = counter - 1;
        $("#counter").text(counter);
    }, 1000);

    setTimeout(function() {
        location.href = "/blog/";
    }, 10000);
});
