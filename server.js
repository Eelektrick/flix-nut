if (process.env.NODE_ENV != 'production') {
    require('dotenv').config()
};

const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");
const bcrypt = require("bcrypt");
const passport = require("./config/passport");
// const flash = require("express-flash");
// const methodOverride = require("method-override");

// const initializePassport = require('./config/passport-config.js');
// initializePassport(
//     passport,
//     // users is a temporary reference to a local array. This will have to be changed to pull from the db.
//     email => users.find(user => user.email === email),
//     id => users.find(
//         user => user.id === id)
//     );

//     // Delete me later
// const users = [];



var PORT = process.env.PORT || 8080;
var db = require("./models");

var app = express();
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

// app.use(methodOverride('_method'));

// app.get('/', checkAuthenticated, (req, res) => {
// 	res.render('index', { name: req.user.name })
// });

// app.get('/login', checkNotAuthenticated, (req, res) => {
//     res.render('login')
// });

// app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
//     successRedirect: '/',
//     failureRedirect: '/login',
//     failureFlash: true
// }))

// app.get('/register', checkNotAuthenticated, (req, res) => {
//     res.render('register')
// });''

// app.post('/register', checkNotAuthenticated, async (req, res) => {
//     try {
//         const hashedPassword = await bcrypt.hash(req.body.password, 10);
//         users.push({
//             id: Date.now().toString(),
//             name: req.body.name,
//             email: req.body.email,
//             password: hashedPassword
//         });
//         res.redirect('/login');
//     } catch {
//         res.redirect('/register');
//     };
//     console.log(users);
// });

// app.delete('/logout', (req, res) => {
//     req.logout()
//     res.redirect('/login')
// })

require("./routes/html-routes.js")(app);
require("./routes/api-routes.js")(app);

// function checkAuthenticated(req, res, next) {
//     if (req.isAuthenticated()) {
//         return next()
//     }
//     res.redirect('login')
// }

// function checkNotAuthenticated(req, res, next) {
//     if (req.isAuthenticated()) {
//         return res.redirect('/')
//     }
//     next()
// }

db.sequelize.sync().then(function() {
  app.listen(PORT, function() {
    console.log("==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.", PORT, PORT);
  });
});