$(document).ready(function() {
  // Getting references to our form and input
  var registerForm = $("form.register");
  var emailInput = $("input#email");
  var passwordInput = $("input#password");

  // When the register button is clicked, we validate the email and password are not blank
  registerForm.on("submit", function(event) {
    event.preventDefault();
    var userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim()
    };
    console.log(userData.email);
    console.log(userData.password);
    return;


    if (!userData.email || !userData.password) {
      return;
    }
    // If we have an email and password, run the registerUser function
    registerUser(userData.email, userData.password);
    emailInput.val("");
    passwordInput.val("");
  });

  // Does a post to the register route. If successful, we are redirected to the members page
  // Otherwise we log any errors
  function registerUser(email, password) {
    $.post("/api/register", {
      email: email,
      password: password
    })
      .then(function(data) {
        window.location.replace("/members");
        // If there's an error, handle it by throwing up a bootstrap alert
      })
      .catch(handleLoginErr);
  }

  function handleLoginErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }
});
