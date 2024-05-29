var urlString = window.location.href;
var url = new URL(urlString);

$(document).ready((function () {
    fieldInputEmpty();

    $(" #text-name").focus(function () {
        $('#error-name').css("display", "none");
        $('#text-name').css("border-color", "#9FB1BD");
        $('#error-send').css("display", "none");
    });

    $(" #text-email").focus(function () {
        $('#error-email').css("display", "none");
        $('#text-email').css("border-color", "#9FB1BD");
        $('#error-send').css("display", "none");
    });

    $(" #text-message").focus(function () {
        $('#error-message').css("display", "none");
        $('#text-message').css("border-color", "#9FB1BD");
        $('#error-send').css("display", "none");
    });
}));

function getInputDataModal() {
    var name = $("#text-name").val().replace(/^\s+|\s+$/g, '');
    var email = $("#text-email").val().replace(/^\s+|\s+$/g, '');
    var message = buildMessage();
    var captcha = $("#text-captcha").val().replace(/^\s+|\s+$/g, '');
    var customSubject = $("#custom-subject").val().replace(/^\s+|\s+$/g, '');
    var mailFrom = $("#mail-from").val().replace(/^\s+|\s+$/g, '');
    var dataPost = {};

    dataPost.action = "TryOurServices";
    dataPost.name = name;
    dataPost.email = email;
    dataPost.company = "";
    dataPost.message = message;
    dataPost.captcha = captcha;
    dataPost.customSubject = customSubject;
    dataPost.mailFrom = mailFrom;
    dataPost.detailedSource = window.location.pathname === "/" ? "Home page" : window.location.pathname;
    dataPost.sourceID = sessionStorage.getItem("sourceID");

    sessionStorage.setItem("clientMessage", message);
    sessionStorage.setItem("clientEmail", email);
    sessionStorage.setItem("clientName", name);
    sessionStorage.setItem("clientAction", "TryOurServices");
    sessionStorage.setItem("clientCaptcha", captcha);
    sessionStorage.setItem("clientMailFrom", mailFrom);
    sessionStorage.setItem("clientDetailedSource", window.location.pathname === "/" ? "Home page" : window.location.pathname);

    return dataPost;
}

function sendEmailModal() {
    var dataPost = getInputDataModal();
    // crmTracking(dataPost);

    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "/api/OSDService/email",
        data: JSON.stringify(dataPost),
        dataType: "text",
        timeout: 100000,
        success: function (data, status, xhr) {
            var result = '';
            var headers = JSON.parse(data).headers;
            for (var i = 0; i < headers.length; i++) {
                var item = headers[i];
                if (item.key === 'result') {
                    result = item.value[0];
                    break;
                }
            }

            if (result === "1") {
                // if(dataPost.customSubject !== "") {
                //     location.href = "/thank-you/"
                // }else {
                //     $(".modal").modal("hide");
                //     contactShowModalSuccess(dataPost.email);
                // }
                if(!url.pathname.includes('/lp/')) {
                    location.href = "/thank-you/";
                }
            } else if (result === "0") {
                $(".modal").modal("hide");
                contactShowErrorDialog();
            }
        },
        error: function (xhr) {
            $(".modal").modal("hide");
            contactShowErrorDialog();
            //getCaptcha();
        }
    });
}

function buildMessage() {
    var textArea = $(" #text-message").val().replace(/^\s+|\s+$/g, '');
    var selectOption = $("input[name=contactOptions]:checked").val();

    var message = 'I\'m interested in: ' + selectOption + '\n. Message: ' + textArea ;

    if(url.pathname.includes("/lp/")) {
        if(sessionStorage.emailIsValid == "true") {
            message = message + ". Email Verified";
        } else {
            message = message + ". Email not Verified";
        }
    }

    return message;
}

function importLeadToFreshsalesLandingpage() {
    var dataPost = getInputDataModal();

    $("#emailtracking").val(dataPost.email);

    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "/api/OSDService/CreateLead",
        data: JSON.stringify(dataPost),
        dataType: "text",
        timeout: 100000,
        success: function (data, status, xhr) {
            console.log("success");
        },
        error: function (xhr) {
            console.log("fail");
        }
    });
}

function fieldInputEmpty() {
    $(" #text-name").val("");
    $(" #text-email").val("");
    $(" #text-message").val("");
}

function checkNameInput() {
    var name = $(" #text-name").val().replace(/^\s+|\s+$/g, '');
    if (name === "") {
        $(" #error-name").css("display", "block");
        $(" #text-name").css("border-color", "#f5532c");
        return false;
    }
    $("#error-name").css("display", "none");
    $(" #text-name").css("border-color", "#9FB1BD");
    return true;
}


function checkEmailInput() {
    var email = $(" #text-email").val().replace(/^\s+|\s+$/g, '');

    if(url.pathname.includes("/lp/")) {
        isValidEmail(email);
    }

    if (email === "") {
        $(" #text-email").css("border-color", "#f5532c");
        $(" #error-email").css("display", "block");
        return false;
    }
    //var pattern = /^[a-z0-9][a-z0-9_\.-]{0,}[a-z0-9]@[a-z0-9][a-z0-9_\.-]{0,}[a-z0-9][\.][a-z0-9]{2,4}$/;
    var pattern = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,63})?$/;
    if (!pattern.test(email)) {
        $(" #error-email").text("Invalid email format!");
        $(" #error-email").css("display", "block");
        return false;
    }

    $(" #error-email").css("display", "none");
    $(" #text-email").css("border-color", "#9FB1BD");
    return true;
}

function checkMessageInput() {
    var message = $(" #text-message").val().replace(/^\s+|\s+$/g, '');
    if (message === "") {
        $(" #text-message").css("border-color", "#f5532c");
        $(" #error-message").css("display", "block");
        // $(" #error-message-2").css("display", "none");
        return false;
    }

    $(" #error-message").css("display", "none");
    // $(" #error-message-2").css("display", "none");
    $(" #text-message").css("border-color", "#9FB1BD");
    return true;
}

function checkCaptchaInput() {
    var captcha = $("#text-captcha").val();
	if (captcha === "") {
		$(" #con-ercaptcha").css("display", "block");
		return false;
	}
	else {
		$(" #con-ercaptcha").css("display", "none");
		return true;
	}
}

function checkAllInputs() {
    var result = true;
    if (!checkNameInput()) {
        result = false;
    }
    if (!checkEmailInput()) {
        result = false;
    }
    if (!checkMessageInput()) {
        result = false;
    }
    if (!checkCaptchaInput()) {
       result = false;
    }
    if (result) {
        if(url.pathname.includes('/lp/')) {
            getInputDataModal();
            location.href = "/lp/it-professionals/";
        }else {
            importLeadToFreshsalesLandingpage();
            sendEmailModal();
        }
    } else {
        $(" #error-send").css("display", "block");
    }
}

var recaptcha_callback_2 = function (response) {
    //debugger;
    $("#text-captcha").val(response);
    console.log('g-recaptcha-response: ' + response);
};
