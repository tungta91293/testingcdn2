$(document).ready(function (){
    $(document).on("click", ".copy-button", function() {
        var url = $(this).attr("data-url");
        var tooltipId = $(this).attr("data-index");

        navigator.clipboard.writeText(url);

        var element = document.getElementById(tooltipId);
        element.classList.add("active");

        setTimeout(function() {
            element.classList.remove("active");
        }, 500);
    });

    var requestURL = "https://cdn.contentful.com/spaces/" + contentfulConfig.CDN_SPACE_ID
                    + "/environments/" + contentfulConfig.CDN_ENV
                    + "/entries?access_token=" + contentfulConfig.CDN_ACCESS_TOKEN
                    + "&metadata.tags.sys.id[0]=" + contentfulConfig.CDN_TAG_ID
    $.ajax({
        type: "GET",
        url: requestURL,

        success: function(data) {
            console.log(data);
            var fileList = data.includes.Asset;

            fileList.forEach( function(element, index) {
                var fileDetail = element.fields.file;

                $("#display-list").append("<div class='row file-detail mb-5'>" +
                        "<p class='col-6'>" +
                            "<a class='col-6' href='" + fileDetail.url + "' target='_blank'> " + fileDetail.fileName + " </a>" +
                        "</p><p class='col-6'>" +
                            "<button class='btn osd-btn--secondary copy-button' data-url='" + fileDetail.url + "' data-index='tooltip-"+ index +"'>Copy link</button>" +
                            "<span class='tooltip-text' id='tooltip-" + index + "'>Link is saved in clipboard</span>" +
                        "</p></div>");
            });
        },
        error: function (xhr) {
            $("#display-list").append("<div>Unexpected error occurs!</div>");
        }
    });
})
