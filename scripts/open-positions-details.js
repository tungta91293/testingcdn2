var applyModals = ".modal";

$(document).ready(function () {
    clickShowTitle();
    //getCaptcha();
    refreshModal();
    closeModalDiaglog(applyModals);

    $(".dropdown-item").click(function () {
        var tabID = $(this).attr("data-id");
        $("#nav-tabs-dropdown .dropdown-toggle").text($(this).text());

        $("a.osd-tab__category").removeClass("active show");
        $("a[href='" + tabID + "']").addClass("active show");

        $(".tab-pane").removeClass("in active show");
        $(tabID).addClass("in active show");
    });

    $("a.osd-tab__category").click(function () {
        var tabID = $(this).attr("href");
        $("#nav-tabs-dropdown .dropdown-toggle").text($(this).text());
    });
});

function sendApplyEmail() {
	var fileUpload = $("#fileCV").get(0);
	var fileCV = fileUpload.files;
	var email = $("#txtEmail").val().replace(/^\s+|\s+$/g, '');
	var firstName = $("#txtFirstName").val().replace(/^\s+|\s+$/g, '');
	var lastName = $("#txtLastName").val().replace(/^\s+|\s+$/g, '');
	var phone = $("#txtPhone").val().replace(/^\s+|\s+$/g, '');
    var subject = $("#hdfSubject").val();
    var id = $("#hdfRcmPstID").val();
    var jobCode = $("#hdfJobCode").val();
    var captcha = $("#txtCaptcha").val();

	var dataPost = new FormData();
	dataPost.append("Email", email);
	dataPost.append("Subject", subject);
	dataPost.append("FirstName", firstName);
	dataPost.append("LastName", lastName);
	dataPost.append("Phone", phone);
	dataPost.append("Resume", fileCV[0]);
    dataPost.append("Id", id);
    dataPost.append("JobCode", jobCode);
	dataPost.append("Captcha", captcha);
    closeModalDiaglog(applyModals);
    applyShowModalWaiting();
    $.ajax({
		type: "POST",
		url: "/api/OSDService/applyemail",
		processData: false,
		contentType: false,
		data: dataPost,
        timeout: 30000,
        success: function (data) {
            var result = '';
			var headers = jQuery.parseJSON(JSON.stringify(data)).headers;
            for (var i = 0; i < headers.length; i++) {
                var item = headers[i];
                if (item.key === 'result') {
                    result = item.value[0];
                    break;
                }
            }
            if (result === "1") {
                $("#ercaptcha").css("display", "none");
                closeModalDiaglog(applyModals);
                applyShowModalSuccess();
            } else if (result === "0") {
                $("#ercaptcha").text("Incorrect code(*)");
                $("#ercaptcha").css({ display: 'block', color: 'red' });
                closeModalDiaglog(applyModals);
                applyShowErrorDialog();
            }
        },
        error: function () {
            closeModalDiaglog(applyModals);
            applyShowErrorDialog();
        }
    });
}

function getPositionDetailForApply(posId, posName) {
	var dataApply = "<div class='app-email-data'>"
		+ "<input type='hidden' id='hdfSubject' value='Apply for " + posName + " position'>"
		+ "<input type='hidden' id='hdfRcmPstID' value='" + posId + "'>"
		+ "<input type='hidden' id='hdfJobCode' value='" + posId + "'>"
		+ "<input type='hidden' id='hdfJobTitle' value='" + posName + "'>"
		+ "<input type='hidden' id='txtCaptcha' /></div>";
	if ($(".app-email-data")){
		$(".app-email-data").remove();
	}
	$('#job-content').append(dataApply);
}

function convertData(data) {
    if (!data) return {};
    if (typeof (data) === 'string') {
		return JSON.parse(data);
    }
    return data;
}

$(function () {
    $("#txtFirstName").focus(function () {
        $("#txtFirstName").css("border-color", "#ccc");
    });
    $("#txtLastName").focus(function () {
        $("#txtLastName").css("border-color", "#ccc");
    });
    $("#txtEmail").focus(function () {
        $("#txtEmail").css("border-color", "#ccc");
    });
    $("#txtPhone").focus(function () {
        $("#txtPhone").css("border-color", "#ccc");
    });
    $("#lblFileCV").click(function () {
        $("#lblFileCV").css("border-color", "#ccc");
    });
    $("#lblCoverLetter").click(function () {
        $("#lblCoverLetter").css("border-color", "#ccc");
    });
});

function checkApplyFirstName() {
    var firstName = $("#txtFirstName").val().replace(/^\s+|\s+$/g, '');
    if(firstName === "")
    {
        $("#txtFirstName").css("border-color", "red");
        return false;
    }
    return true;
}

function checkApplyLastName() {
    var lastName = $("#txtLastName").val().replace(/^\s+|\s+$/g, '');
    if(lastName === "")
    {
        $("#txtLastName").css("border-color", "red");
        return false;
    }
    return true;
}

function checkApplyEmail() {
    var email = $("#txtEmail").val().replace(/^\s+|\s+$/g, '');
	var pattern = '^[a-z0-9][a-z0-9_\.-]{0,}[a-z0-9]@[a-z0-9][a-z0-9_\.-]{0,}[a-z0-9][\.][a-z0-9]{2,4}$';

	if (email.match(pattern) === null || email === "") {
        $("#txtEmail").css("border-color", "red");
        return false;
    }
    return true;
}

function checkApplyPhone() {
	var phone = $("#txtPhone").val().replace(/^\s+|\s+$/g, '');
	var pattern = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/;

	if (phone.match(pattern) === null || phone === "") {
		$("#txtPhone").css("border-color", "red");
		return false;
	}
	return true;
}

function checkCV() {
   var cv = $("#fileCV").val().replace(/^\s+|\s+$/g, '');
   if (cv === "") {
       $("#lblFileCV").css("border-color", "red");
       return false;
   }
   return true;
}

function checkApplyCaptcha() {
	var captcha = $("#txtCaptcha").val();
	if (captcha === "") {
		return false;
	}
	else {
		return true;
	}
}


function checkAllForCareerApply() {
    var result = true;
    if (!checkApplyFirstName()) {
        result = false;
    }
    if (!checkApplyLastName()) {
        result = false;
    }
    if (!checkApplyEmail()) {
        result = false;
    }
    if (!checkApplyPhone()) {
        result = false;
    }
    if (!checkCV()) {
        result = false;
    }
    if (!checkApplyCaptcha()) {
       result = false;
    }

    if (result) {
        sendApplyEmail();
    }
}

function showModalDialog(modal) {
    $(modal).modal('show');
}

function closeModalDiaglog(modal) {
    $(modal).modal('hide');
};

function refreshModal() {
    $('#apply-form').on('hidden.bs.modal', function () {
        $(this).children('div.modal-dialog').css('margin-top', '');
        $(this).find('input').val('').css("border-color", "").end();
        $('.modal-body').children('p.eremail').css("display", "none");
        $('.modal-body').children('p.ercaptcha').css("display", "none");
    });
}

function centeringModalPositionAtFirst(modal) {
    $(modal).
        css({
            visibility: 'hidden',
            display: 'block',
        });

    var $self = $(modal).children('div.modal-dialog');
    $self.css('margin-top', "");
    var userScreenHeight = $(window).height();
    var initModalHeight = $self.outerHeight();
    var maginTop = (userScreenHeight - initModalHeight) / 2;
    if ((initModalHeight > userScreenHeight)) {
        $self.css('overflow', 'auto');
    } else {
        $self.css('margin-top', maginTop);
    }

    $(modal).
        css({
            visibility: 'visible',
            display: 'none',
        });
}

function centeringModalPositionShow(modal) {
    $(modal).on('shown.bs.modal', function () {
        var $self = $(modal).children('div.modal-dialog');
        $self.css('margin-top', "");
        var userScreenHeight = $(window).height();
        var initModalHeight = $self.outerHeight();
        var marginTop = (userScreenHeight - initModalHeight) / 2;
        if ((initModalHeight > userScreenHeight)) {
            $self.css('overflow', 'auto');
            $self.stop().animate({
                "opacity": "1",
                marginTop: "30px",
            }, 450, "linear");
        } else {
            $self.stop().animate({
                "opacity": "1",
                marginTop: marginTop,
            }, 450, "linear");
        }
    });
}

function closePositionModal(modalID) {
    $(modalID).children('div.modal-dialog').stop().animate({
        "opacity": "0",
        "margin-top": "0",
    }, 450, function () {
        $(modalID).modal('hide');
        $('body').removeClass('modal-open');
        $('body > div.modal-backdrop').remove();
        $('#job-content > div.app-email-data').remove();
    });
}

function closeModal(modalID) {
    $(modalID).children('div.modal-dialog').stop().animate({
        "opacity": "0",
        "margin-top": "0",
    }, 450, function () {
        $(modalID).modal('hide');
        $('body').removeClass('modal-open');
        $('body > div.modal-backdrop').remove();
    });
}

function centeringModalPosition(modal) {
    var $self = $(modal).children('div.modal-dialog');
    $self.css('margin-top', "");
    var userScreenHeight = $(window).height();
    var initModalHeight = $self.outerHeight();
    var maginTop = (userScreenHeight - initModalHeight) / 2;
    if ((initModalHeight > userScreenHeight)) {
        $self.css('overflow', 'auto');
    } else {
        $self.css('margin-top', maginTop);
    }
}

function clickShowTitle() {
    $('a#apply-click').on('click', function () {
        var title = $(this).parents('li').children('div.job-info').children('a').text();
		var posId = $(this).data('id');
		var posName = $(this).data('name');
        $('#apply-form').find('.modal-title').text('Apply for ' + title + ' position');
        /*$('#apply-form').find('.btn-sign-in').attr('href', 'https://systemtest-jobchannel-sg-www.azurewebsites.net/app/my-applications?jobcode=' + posId + '&source=yournext');*/
		getPositionDetailForApply(posId, posName);
    });
}

var recaptcha_callback = function (response) {
    //debugger;
    $("#txtCaptcha").val(response);
    console.log('g-recaptcha-response: ' + response);
};

/* JS to display file name after seclected */
$(document).ready(function () {
	var label = $("#lblFileCV");
	var labelVal = label.text();
	$('#fileCV').change(function (event) {
		var fileName = event.target.files[0].name;
		if (fileName)
			label.text(fileName);
		else
			label.text(labelVal);
	});
});


function applyShowErrorDialog() {
    $("#error-message-box p.modal-title").text("Error");
    $("#error-message-box p.modal-message").text("An error occurred, please try again later!");
    $("#error-message-box p.modal-message").css("color", "#f5532c");
	$('#error-message-box').modal('show');
}

function applyShowModalSuccess() {
    $("#success-career-message-box p.modal-title").text("Information");
    $("#success-career-message-box p.modal-message").html("Thank you for applying with Orient Software.<br />We will send you an email for confirmation soon!.");
    $("#success-career-message-box p.modal-message").css("color", "#303030");
	$('#success-career-message-box').modal('show');
}

function applyShowModalWaiting() {
    $("#waiting-message-box p.modal-title").text("Message");
    $("#waiting-message-box p.modal-message").text("Please wait...");
    $("#waiting-message-box p.modal-message").css("color", "#303030");
	$('#waiting-message-box').modal('show');
}
