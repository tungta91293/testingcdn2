var radioButtonValue = "";

$(document).ready((function () {

    $("input[name=surveyOption]").click(function () {

        if($("#dateOption-4").is(":checked")) {
            $("#date-options").removeClass("d-none");
        } else {
            $("#date-options").addClass("d-none");
        }
    });

    $("#survey-submit").click(function() {
        $(this).attr("disabled", "disabled");

        getSelectedData();

        var redirectUrl = $(this).attr('data-redirect');
        if(redirectUrl){
            redirect(redirectUrl);
        }else {
            upsertLeadToFreshsales();
        }
    });
}));

function getSelectedData() {
    if($("#dateOption-4").is(":checked")) {
        radioButtonValue = $("input[name=surveySubOption]:checked").val();
    } else {
        radioButtonValue = $("input[name=surveyOption]:checked").val();;
    }

    sessionStorage.setItem("clientMessage", sessionStorage.clientMessage + "; " + radioButtonValue);
}

function redirect(destination) {
    location.href = destination;
}

function upsertLeadToFreshsales() {
    var dataPost = {};

    dataPost.email = sessionStorage.clientEmail;
    dataPost.message = sessionStorage.clientMessage;
    dataPost.action = sessionStorage.clientAction;
    dataPost.name = sessionStorage.clientName;
    dataPost.company = sessionStorage.clientCompany? sessionStorage.clientCompany : "";
    dataPost.captcha = sessionStorage.clientCaptcha;
    dataPost.customSubject = "";
    dataPost.mailFrom = sessionStorage.clientMailFrom;
    dataPost.detailedSource = sessionStorage.clientDetailedSource;
    dataPost.sourceID = sessionStorage.sourceID;

    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "/api/OSDService/CreateLead",
        data: JSON.stringify(dataPost),
        dataType: "text",
        timeout: 100000,
        success: function (data, status, xhr) {
            console.log("success");
            if(sessionStorage.emailIsValid == "true") {
                location.href = "/many-thanks/";
            } else {
                location.href = "/thanks/";
            }
        },
        error: function (xhr) {
            console.log("fail");
        }
    });
}
