var express = require("express"),
  mongoose = require("mongoose"),
  bodyParser = require("body-parser"),
  passport = require("passport"),
  localStrategy = require("passport-local"),
  passportLocalMongoose = require("passport-local-mongoose"),
  User = require("./models/user"),
  mysql = require("mysql");

var app = express();
app.use(
  require("express-session")({
    secret: "I'm nikhil",
    resave: false,
    saveUninitialized: false
  })
);

mongoose.connect("mongodb://localhost/sm");

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(function(req, res, next) {
  res.locals.currentUser = req.user;
  next();
});

passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//           HOME
app.set("view engine", "ejs");
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Nikkhsssp1@",
  database: "sm"
});
connection.connect(function(err) {
  if (err) throw err;
  console.log("connected");
});

app.get("/", function(req, res) {
  res.render("index", { currentUser: req.user });
});
app.get("/info", function(req, res) {
  res.render("info");
});
app.post("/abc", function(req, res) {
  console.log(req);
  var person = {
    email: req.user.username,
    fname: req.body.fname,
    lname: req.body.lname,
    dob: req.body.dob,
    phone: req.body.phone,
    gender: req.body.gender
  };
  var q = "insert into users set ?";
  connection.query(q, person, function(err, results, fields) {
    if (err) throw err;
    else {
      console.log(results);
      res.render("home");
    }
  });
});
app.post("/def", function(req, res) {
  var q = "select user_id from users where email=?";
  connection.query(q, [req.user.username], function(err, results) {
    if (err) throw err;
    else {
      console.log(results[0].user_id);
      var photo = {
        image_url: req.body.image_url,
        user_id: results[0].user_id
      };
      var q1 = "insert into photos set ?";
      connection.query(q1, photo, function(err, results, fields) {
        if (err) throw err;
        else {
          console.log(results);
          res.render("home");
        }
      });
    }
  });
});

app.get("/contact", function(req, res) {
  res.render("contact");
});

app.get("/home", function(req, res) {
  res.render("home");
});
app.get("/add_photo", function(req, res) {
  res.render("add_photo");
});
app.get("/xyz", function(req, res) {
  var q = "select user_id from users where email=?";
  connection.query(q, [req.user.username], function(err, results, fields) {
    if (err) throw err;
    else {
      console.log(results[0].user_id);
      var photo = {
        image_url:
          "http://c1.staticflickr.com/9/8450/8026519634_f33f3724ea_b.jpg",
        user_id: results[0].user_id
      };
      var q1 = "select * from photos where user_id = ?";
      connection.query(q1, [results[0].user_id], function(err, results) {
        if (err) throw err;
        else {
          console.log(results);
          res.render("qwerty", { p: results });
        }
      });
    }
  });
});

app.get("/sss", function(req, res) {
  var q =
    "select user_id,email from users where fname=? or lname=? or email = ? or phone=?";
  connection.query(
    q,
    [req.query.fname, req.query.lname, req.query.email, req.query.phone],
    function(err, result) {
      if (err) throw err;
      else {
        console.log(res);
        res.render("searchfriend", { result });
      }
    }
  );
});
app.get("/all", function(req, res) {
  var q =
    "select email,user_id from users where email not in (select email from users where email=?)";
  connection.query(q, [req.user.username], function(err, results) {
    if (err) throw err;
    else {
      console.log(results);
      res.render("all", { a: results });
    }
  });
});
app.get("/follow/:id", function(req, res) {
  connection.query(
    "select user_id from users where email=?",
    req.user.username,
    function(err, result) {
      console.log(result);
      if (err) throw err;
      else {
        var q = "insert into follows set ?";
        var follow = {
          follower_id: result[0].user_id,
          following_id: req.params.id
        };
        connection.query(q, follow, function(err, results) {
          if (err) throw err;
          else {
            console.log(results);
            res.redirect("/home");
          }
        });
      }
    }
  );
});
app.get("/photos/:id", function(req, res) {
  var q =
    "select photo_id,image_url from photos where user_id=" + req.params.id;
  connection.query(q, function(err, results) {
    if (err) throw err;
    else {
      console.log(results);
      res.render("pp", { a: results });
    }
  });
});
app.get("/like/:p_id", function(req, res) {
  var q = "select user_id from users where email=?";
  connection.query(q, [req.user.username], function(err, results, fields) {
    if (err) {
      res.render("error");
    } else {
      console.log(results[0].user_id);
      var like = {
        user_id: results[0].user_id,
        photo_id: req.params.p_id
      };
      var q1 = "insert into likes set ?";
      connection.query(q1, like, function(err, results, fields) {
        if (err) throw err;
        else {
          console.log(results);
          res.render("index");
        }
      });
    }
  });
});

//                         AUTHENTICATION

app.get("/register", function(req, res) {
  res.render("register");
});
app.post("/register", function(req, res) {
  var newUser = new User({ username: req.body.username });
  User.register(newUser, req.body.password, function(er, user) {
    if (er) {
      console.log(er);
      return res.render("register");
    }
    passport.authenticate("local")(req, res, function() {
      res.redirect("/info");
    });
  });
});
app.get("/login", function(req, res) {
  res.render("login");
});
app.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/home",
    failureRedirect: "/login"
  }),
  function(req, res) {}
);
app.get("/logout", function(req, res) {
  req.logout();
  res.redirect("/");
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.render("notlogged");
}

//              LISTEN

app.listen(3000, function() {
  console.log("server is running");
});
