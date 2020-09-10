$(document).ready(function () {
  var signUpForm = $("form.signup");
  var emailInput = $("input#email");
  var passwordInput = $("input#password");

  signUpForm.on("submit", function (event) {
    event.preventDefault();
    var userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim(),
    };

    if (!userData.email || !userData.password) {
      return;
    }
    signUpUser(userData.email, userData.password);
    emailInput.val("");
    passwordInput.val("");
  });

  function signUpUser(email, password) {
    $.post("/api/signup", {
      email: email,
      password: password,
    })
    .then(function (data) {
      window.location.replace("/");
      // If there's an error, handle it by throwing up a bootstrap alert
    })
    .catch(handleLoginErr);
  }

  function handleLoginErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }
});