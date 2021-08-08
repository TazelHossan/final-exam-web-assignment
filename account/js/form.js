// JavaScript source code
jQuery(document).ready(function ($) {
  function capitalise(string) {
    return string ? string[0].toUpperCase() + string.slice(1) : "";
  }

  function toggleCorrect(className, correctState) {
    $(className).removeClass("missing");
    if (correctState) {
      $(className).removeClass("error");
      $(className).addClass("correct");
    } else {
      $(className).removeClass("correct");
      $(className).addClass("error");
    }
  }

  function validEmail(value) {
    return (
      value &&
      value !== "" &&
      value.match(
        /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
      )
    );
  }

  function validPassword(password) {
    const capitalCheck = new RegExp(/.*[A-Z].*/);
    const lowerCheck = new RegExp(/.*[a-z].*/);
    const numberCheck = new RegExp(/.*[0-9].*/);
    const symbolCheck = new RegExp(
      /.*[~!@#$%^&*()_+`\-={}[\]:";',.\/<>?|\\].*/
    );
    if (password.length >= 8) {
      toggleCorrect(".password-hint-length", true);
    } else {
      toggleCorrect(".password-hint-length", false);
    }

    if (password.match(capitalCheck) !== null) {
      toggleCorrect(".password-hint-capital", true);
    } else {
      toggleCorrect(".password-hint-capital", false);
    }

    if (password.match(lowerCheck) !== null) {
      toggleCorrect(".password-hint-lower", true);
    } else {
      toggleCorrect(".password-hint-lower", false);
    }

    if (password.match(numberCheck) !== null) {
      toggleCorrect(".password-hint-number", true);
    } else {
      toggleCorrect(".password-hint-number", false);
    }

    if (password.match(symbolCheck) !== null) {
      toggleCorrect(".password-hint-symbol", true);
    } else {
      toggleCorrect(".password-hint-symbol", false);
    }
    if ($(".password-error").hasClass("active")) {
      $(".password-error").removeClass("active");
    }
  }

  function formValid() {
    if (
      ($("#Email").length > 0 && $("#Email").val() === "") ||
      ($("#Password").length > 0 && $("#Password").val() === "") ||
      $(".error").length > 0
    ) {
      $("button[type='submit']")
        .prop("disabled", true)
        .parent()
        .addClass("disabled");
    } else {
      $("button[type='submit']")
        .prop("disabled", false)
        .parent()
        .removeClass("disabled");
    }
  }

  function passwordMatch() {
    var formGroup = $("#ConfirmPassword").closest(".form-group");
    if ($("#Password").length > 0 && $("#ConfirmPassword").length > 0) {
      if (
        $("#Password").val() === "" ||
        $("#ConfirmPassword").val() === "" ||
        $("#Password").val() !== $("#ConfirmPassword").val()
      ) {
        $("button[type='submit']")
          .prop("disabled", true)
          .parent()
          .addClass("disabled");
        addMessage(formGroup, "Your passwords do not match", "error");
        return false;
      } else {
        $("button[type='submit']")
          .prop("disabled", false)
          .parent()
          .removeClass("disabled");
        addMessage(formGroup, "", "valid");
        $(formGroup).removeClass("error");
        return true;
      }
    }
    return false;
  }

  function addMessage(element, errorMsg, state = "error", location = "Email") {
    const errorObj = `<span id="${location}-error">${errorMsg}</span>`;
    if (state === "error") {
      $(element).addClass("error");
      $(element)
        .find(".validation-label")
        .removeClass("field-validation-valid");
      $(element).find(".validation-label").addClass("field-validation-error");
      $(element).find(".validation-label").html(errorObj);
    } else if (state === "valid") {
      $(element)
        .find(".validation-label")
        .removeClass("field-validation-error");
      $(element).find(".validation-label").addClass("field-validation-valid");
      $(element).find(".validation-label").html(errorObj);
    } else {
      $(element)
        .find(".validation-label")
        .removeClass("field-validation-error");
      $(element)
        .find(".validation-label")
        .removeClass("field-validation-valid");
    }
  }

  function validatePasswordHints() {
    $(".password-hint .error").each(function (i, e) {
      $(e).addClass("missing");
    });
    const formGroup = $("#Password").closest(".form-group");
    $(formGroup).addClass("error");
  }

  function validateEmail(element, callback) {
    const formGroup = $(element).closest(".form-group");
    const token = $("input[name='__RequestVerificationToken']").val();
    $.ajax({
      url: "../Api/ValidateEmail",
      data: {
        email: element.value,
      },
      dataType: "JSON",
      type: "GET",
      beforeSend: function (req) {
        req.setRequestHeader("RequestVerificationToken", token);
        $("#Email").closest(".form-group").removeClass("error");
        addMessage($("#Email").closest(".form-group"), "", "");
      },
    })
      .done((response) => {
        if (
          (response.status === "valid" ||
            response.status === "whitelisted" ||
            response.status === "unknown" ||
            response.status === "accept_all") &&
          response.disposable === "false"
        ) {
          callback();
        } else {
          let errorMsg = "That email appears to be invalid";

          addMessage(formGroup, errorMsg);
          $("form").removeClass("submitting");
        }
      })
      .fail((response) => {
        let errorMsg = "There was an error validating this email";

        addMessage(formGroup, errorMsg, "success");
        $("form").removeClass("submitting");
      })
      .always((response) => {
        if (typeof window.dataLayer !== "undefined") {
          const emailParts = element.value.split("@");
          const status =
            response.status === "valid"
              ? "Success"
              : response.status === "invalid"
              ? "Fail"
              : capitalise(response.status);
          const eventData = {
            Validation: status,
            Domain: emailParts[1],
          };
          window.dataLayer.push({
            event: "emailValidation",
            eventProperties: eventData,
          });
        }
      });
  }

  $(".credit-form #Password").on("focus", function () {
    const parent = $(this).closest(".form-group");
    $(parent).find(".password-hint").removeClass("invisible");
    $(parent).find(".password-hint").addClass("visible");
  });

  $("input").on("focus", function (e) {
    $(this).closest(".form-group").addClass("focus");
    $(this).attr("data-touching", true);
  });

  $("input").on("focusout", function (e) {
    $(this).closest(".form-group").removeClass("focus");
    $(this).attr("data-touched", true);
    $(this).attr("data-touching", false);
  });

  $("form.form").on("submit", function (e) {
    $("button[type='submit']")
      .prop("disabled", true)
      .parent()
      .addClass("disabled");
    $(this).addClass("submitting");
    setTimeout(
      (form) => {
        if (
          form.find(".input-validation-error").length > 0 ||
          form.find(".field-validation-error").length > 0
        ) {
          form.removeClass("submitting");
          $("button[type='submit']")
            .prop("disabled", false)
            .parent()
            .removeClass("disabled");
          e.preventDefault();
        }
      },
      200,
      $(this)
    );
  });

  $("form.credit-form").on("submit", function (e) {
    e.preventDefault();
    $("button[type='submit']")
      .prop("disabled", true)
      .parent()
      .addClass("disabled");

    if (!passwordMatch()) {
      $("#ConfirmPassword").attr("data-touched", true);
      return;
    }

    $(this)
      .find("#Password")
      .each(function (i, e) {
        if (!$(e).valid()) {
          $(this).closest(".form-group").addClass("error");
        }
      });

    if (!validEmail($("#Email").val())) {
      const formGroup = $("#Email").closest(".form-group");
      let msg = "";
      $(formGroup).addClass("error");
      if ($("#Email").val() === "") {
        msg = "The email field is required";
      } else {
        msg = "Please enter a valid email address";
      }
      addMessage(formGroup, msg);
      $(this).removeClass("submitting");

      $("button[type='submit']")
        .prop("disabled", false)
        .parent()
        .removeClass("disabled");

      return;
    }

    if ($(".password-hint .error").length > 0) {
      validatePasswordHints();
      $(this).removeClass("submitting");
      $("button[type='submit']")
        .prop("disabled", false)
        .parent()
        .removeClass("disabled");
    } else {
      $(this).addClass("submitting");
      validateEmail($("#Email")[0], () => {
        $(this).unbind("submit").submit();
      });
    }
  });

  $("#Password").on("input", function () {
    formValid();
  });

  $(".credit-form #Password").on("input", function () {
    const value = $(this).val();
    validPassword(value);
    formValid();

    if ($("#ConfirmPassword").attr("data-touched") === "true") {
      passwordMatch();
    }
    if (
      $(this).attr("data-touching") === "true" &&
      $(".password-hint .error").length === 0
    ) {
      $(this).closest(".error").removeClass("error");
    }
  });

  $("#ConfirmPassword").on("blur", function () {
    formValid();
    if ($("#Password").attr("data-touched") === "true") {
      if (!passwordMatch() || !$(this).valid()) {
        $(this).closest(".form-group").addClass("error");
      } else {
        $(this).closest(".error").removeClass("error");
      }
    }
  });

  $("#ConfirmPassword").on("input", function () {
    if ($(this).attr("data-touched") === "true") {
      if (!passwordMatch()) {
        $(this).closest(".form-group").addClass("error");
      } else {
        $(this).closest(".error").removeClass("error");
      }
    }
  });

  $(".credit-form #Password").on("blur", function () {
    const value = $(this).val();
    validPassword(value);
    if ($(".password-hint .error").length > 0) {
      validatePasswordHints();
    }

    if ($(".password-hint .error").length === 0) {
      const parent = $(this).closest(".form-group");
      $(parent).find(".password-hint").removeClass("visible");
      $(parent).removeClass("error");
      $(parent).find(".password-hint").addClass("invisible");
    }
  });

  $("#Email").on("input", function (e) {
    const formGroup = $(this).closest(".form-group");
    formValid();
    if (!validEmail(e.target.value)) {
      $(formGroup).addClass("error");
    } else {
      $(formGroup).removeClass("error");
      addMessage(formGroup, "", "valid");
    }
  });

  $("#Email").on("blur", function (e) {
    const formGroup = $(this).closest(".form-group");
    if (!validEmail(e.target.value)) {
      $(formGroup).addClass("error");

      let errorMsg = "Please enter a valid email address";
      addMessage(formGroup, errorMsg);
    } else {
      $(formGroup).removeClass("error");
      addMessage(formGroup, "", "valid");
    }
  });

  $("form input").each(function (i, e) {
    $(e).attr("aria-required", "true");
  });

  $("#Password-visible, #Confirm-Password-visible").on("click", function (e) {
    e.preventDefault();
    const inputField = $(this).prev();
    if (inputField.prop("type") === "password") {
      $(this).addClass("active");
      inputField.prop("type", "text");
    } else {
      $(this).removeClass("active");
      inputField.prop("type", "password");
    }
  });

  formValid();
});
