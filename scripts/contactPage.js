var urlString = window.location.href;
var url = new URL(urlString);

$(document).ready((function () {
    fieldEmpty();
    getLeadSource();
    // getLastPage();

    $("#con-serivces").change(function(){
        if ($(this).val() === "") $(this).css({color: "#949494"});
        else $(this).css({color: "#111"});
    });

    $(" #con-txtname").focus(function () {
        $('#con-ername').css("display", "none");
        $('#con-txtname').css("border-color", "#9FB1BD");
        $('#con-send').css("display", "none");
    });

    $(" #con-txtemail").focus(function () {
        $('#con-eremail').css("display", "none");
        $('#con-txtemail').css("border-color", "#9FB1BD");
        $('#con-send').css("display", "none");
    });

    $(" #con-txtcompany").focus(function () {
        $('#con-ercomp').css("display", "none");
        $('#con-txtcompany').css("border-color", "#9FB1BD");
        $('#con-send').css("display", "none");
    });

    $(" #con-txtmessage").focus(function () {
        $('#con-ermessage').css("display", "none");
        $('#con-txtmessage').css("border-color", "#9FB1BD");
        $('#con-send').css("display", "none");
    });

    $(" #con-txtcaptcha").focus(function() {
        $('#con-ercaptcha').css("display", "none");
        $('#con-txtcaptcha').css("border-color", "#9FB1BD");
        $('#con-send').css("display", "none");
    });
}));

function getLeadSource() {
    // var leadSource = url.searchParams.get("utm_source");
    var leadSource = url.pathname.includes("/lp/")? "google-ads" : url.searchParams.get("utm_source");

    if(typeof(Storage) !== "undefined") {
        if(!sessionStorage.getItem("sourceID")) {
            switch (leadSource){
                case "mailchimp-edm":
                    sessionStorage.setItem("sourceID", "MailchimpEDM");
                    break;
                case "google-ads":
                    sessionStorage.setItem("sourceID", "GoogleAds");
                    break;
                case "linkedin-ads":
                    sessionStorage.setItem("sourceID", "LinkedinAds");
                    break;
                case "press_release":
                    sessionStorage.setItem("sourceID", "PressRelease");
                    break;
                case "monthly-newsletter":
                    sessionStorage.setItem("sourceID", "MonthlyNewsletter");
                    break;
                default:
                    sessionStorage.setItem("sourceID", "Organic");
                    break;
            }
        }
    }
}

function sendEmail() {
    dataPost = getFormData();

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

function buildContactMessage() {
    var textArea = $(" #con-txtmessage").val().replace(/^\s+|\s+$/g, '');
    var inputVal = $(" #select-services").val() ? $(" #select-services").val().replace(/^\s+|\s+$/g, '') : "Other";

    var message = 'I\'m interested in: ' + inputVal + '\n. Message: ' + textArea;

    if(url.pathname.includes("/lp/")) {
        if(sessionStorage.emailIsValid == "true") {
            message = message + ". Email Verified";
        } else {
            message = message + ". Email not Verified";
        }
    }

    return message;
}

function fieldEmpty() {
    $(" #con-txtname").val("");
    $(" #con-txtemail").val("");
    $(" #con-txtcompany").val("");
    $(" #con-txtmessage").val("");
    $(" #con-txtcaptcha").val("");
}

function checkName() {
    var name = $(" #con-txtname").val().replace(/^\s+|\s+$/g, '');
    if (name === "") {
        $(" #con-ername").css("display", "block");
        $(" #con-txtname").css("border-color", "#f5532c");
        return false;
    }
    $("#con-ername").css("display", "none");
    $(" #con-txtname").css("border-color", "#9FB1BD");
    return true;
}

function checkCompanyName() {
    var companyName = $(" #con-txtcompany").val().replace(/^\s+|\s+$/g, '');
    if (companyName === "") {
        $(" #con-ercomp").css("display", "block");
        $(" #con-txtcompany").css("border-color", "#f5532c");
        return false;
    }
    $("#con-ercomp").css("display", "none");
    $(" #con-txtcompany").css("border-color", "#9FB1BD");
    return true;
}

function checkEmail() {
    var email = $(" #con-txtemail").val().replace(/^\s+|\s+$/g, '');

    if(url.pathname.includes("/lp/")) {
        isValidEmail(email);
    }

    if (email === "") {
        $(" #con-txtemail").css("border-color", "#f5532c");
        $(" #con-eremail").css("display", "block");
        return false;
    }
    //var pattern = /^[a-z0-9][a-z0-9_\.-]{0,}[a-z0-9]@[a-z0-9][a-z0-9_\.-]{0,}[a-z0-9][\.][a-z0-9]{2,4}$/;
    var pattern = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,63})?$/;
    if (!pattern.test(email)) {
        $(" #con-eremail").text("Invalid email format!");
        $(" #con-txtemail").css("border-color", "#f5532c");
        $(" #con-eremail").css("display", "block");
        return false;
    }

    if(spamEmails.includes(email)) {
        $(" #con-eremail").text("Your email was marked as spam");
        $(" #con-txtemail").css("border-color", "#f5532c");
        $(" #con-eremail").css("display", "block");

        return false;
    }

    $(" #con-eremail").css("display", "none");
    $(" #con-txtemail").css("border-color", "#9FB1BD");
    return true;
}

function checkMessage() {
    var message = $(" #con-txtmessage").val().replace(/^\s+|\s+$/g, '');
    if (message === "") {

        $(" #con-txtmessage").css("border-color", "#f5532c");
        $(" #con-ermessage").css("display", "block");
        // $(" #con-ermessage-2").css("display", "none");
        return false;
    }

    $(" #con-ermessage").css("display", "none");
    // $(" #con-ermessage-2").css("display", "none");
    $(" #con-txtmessage").css("border-color", "#9FB1BD");
    return true;
}

function checkCaptcha() {
    var captcha = $("#txtCaptcha").val();
	if (captcha === "") {
		$(" #con-ercaptcha").css("display", "block");
		return false;
	}
	else {
		$(" #con-ercaptcha").css("display", "none");
		return true;
	}
}

function checkAll() {
    var result = true;
    if (!checkName()) {
        result = false;
    }
    if (!checkEmail()) {
        result = false;
    }
    if (!checkCompanyName()) {
        result = false;
    }
    if (!checkMessage()) {
        result = false;
    }
    if (!checkCaptcha()) {
       result = false;
    }

    if (result) {
        if(url.pathname.includes('/lp/')) {
            getFormData();
            location.href = "/lp/it-professionals/";
        }else {
            importLeadToFreshsales();
            sendEmail();
        }
    } else {
        $(" #con-send").css("display", "block");
    }
}

function getFormData() {
    var name = $(" #con-txtname").val().replace(/^\s+|\s+$/g, '');
    var email = $(" #con-txtemail").val().replace(/^\s+|\s+$/g, '');
    var companyName = $(" #con-txtcompany").val().replace(/^\s+|\s+$/g, '');
    var message = buildContactMessage();
    var captcha = $(" #txtCaptcha").val().replace(/^\s+|\s+$/g, '');
    var customSubject = $(" #customSubject").val().replace(/^\s+|\s+$/g, '');
    var mailFrom = $(" #mailFrom").val().replace(/^\s+|\s+$/g, '');

    var dataPost = {};
    dataPost.action = "TryOurServices";
    dataPost.name = name;
    dataPost.email = email;
    dataPost.company = companyName;
    dataPost.message = message;
    dataPost.captcha = captcha;
    dataPost.customSubject = customSubject;
    dataPost.mailFrom = mailFrom;
    dataPost.detailedSource = window.location.pathname === "/" ? "Home page" : window.location.pathname;
    dataPost.sourceID = sessionStorage.getItem("sourceID");

    sessionStorage.setItem("clientMessage", message);
    sessionStorage.setItem("clientEmail", email);
    sessionStorage.setItem("clientCompany", companyName);
    sessionStorage.setItem("clientName", name);
    sessionStorage.setItem("clientAction", "TryOurServices");
    sessionStorage.setItem("clientCaptcha", captcha);
    sessionStorage.setItem("clientMailFrom", mailFrom);
    sessionStorage.setItem("clientDetailedSource", window.location.pathname === "/" ? "Home page" : window.location.pathname);

    return dataPost;
}

/*function crmTracking(dataPost) {
    var lcChannel = $(" #lc_channel").val().replace(/^\s+|\s+$/g, '');
    var fcSource = $(" #fc_source").val().replace(/^\s+|\s+$/g, '');
    var fcMedium = $(" #fc_medium").val().replace(/^\s+|\s+$/g, '');
    var fcContent = $(" #fc_content").val().replace(/^\s+|\s+$/g, '');
    var fcChannel = $(" #fc_channel").val().replace(/^\s+|\s+$/g, '');
    var pageVisit = $(" #pages_visited_list").val().replace(/^\s+|\s+$/g, '');

    var new_contact =
    {
        "Last name": dataPost.name,  //Replace with last name of the user
        "Email": dataPost.email, //Replace with email of the user
        "Source": dataPost.sourceID,
        "Tags": "CRM Tracking",
        "Last page visit": sessionStorage.getItem("lastPageVisited"), //Replace with a custom field
        "Lead Notes": dataPost.message, //Replace with a custom field
        "Detailed source": dataPost.detailedSource,
        "fc_source": fcSource,
        "fc_medium": fcMedium,
        "fc_content": fcContent,
        "fc_channel": fcChannel,
        "lc_channel": lcChannel,
        "pages_visited_list": pageVisit,
        "company": {
            "Name": dataPost.company, //Replace with company name
        }
    };

    var identifier = dataPost.email;
    fwcrm.identify(identifier, new_contact);
}*/

function importLeadToFreshsales() {
    dataPost = getFormData();

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

function isValidEmail(email) {
    const settings = {
        "async": false,
        "crossDomain": true,
        "url": "https://api.millionverifier.com/api/v3/?api="+ MillionVerifierAPIKEY + "&email="+ email +"&timeout=5",
        "method": "GET",
        "headers": { }
    };

    $.ajax(settings).done(function (response) {
        // console.log(response);
        if(response.result === "ok" || response.result === "catch_all") {
            sessionStorage.setItem("emailIsValid","true");
        }else {
            sessionStorage.setItem("emailIsValid","false");
        }
    });
}

// function getLastPage() {
//     var urlString = window.location.href;
//     var url = new URL(urlString);

//     if(url.pathname === "/") {
//         sessionStorage.setItem("lastPageVisited", "Homepage");
//     } else if(url.pathname !== '/contact/') {
//         sessionStorage.setItem("lastPageVisited", url.pathname);
//     }
// }

function contactShowErrorDialog() {
    $(".error-message-box p.modal-title").text("Error");
    $(".error-message-box p.modal-message").text("An error occurred, please try to send us an email to sales@orientsoftware.com instead!");
    $(".error-message-box p.modal-message").css("color", "#f5532c");
    $('.error-message-box').modal('show');
}

function contactShowModalSuccess(email) {
    $(".success-message-box p.modal-title").text("Thank you");
    $(".success-message-box p.modal-message").text("Thank you for contacting Orient Software Development Corporation. We will get back to you shortly with more information.");
    $(".success-message-box p.modal-message").css("color", "#303030");
    $(".success-message-box .btnClose").css("display", "none");
    $(".success-message-box .btnOk").css("display", "block");
    $('.success-message-box').modal('show');
}


var recaptcha_callback = function (response) {
    //debugger;
    $("#txtCaptcha").val(response);
    // console.log('g-recaptcha-response: ' + response);
};
