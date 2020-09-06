// Wont let user go to pages that require log in
module.exports = function(req, res, next) {
  // If the user is logged in, continue with the request to the restricted route
  if (req.user) {
    return next();
  }

  // In not loged in, it'll reroute to login page
  return res.redirect("/");
};