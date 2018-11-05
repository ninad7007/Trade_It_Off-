var express=require('express');
var app=express();
var mongoose=require('mongoose');
var bodyParser=require('body-parser');
var mysql=require('mysql'),
    passport = require("passport"),
    localStrategy = require("passport-local"),
    passportLocalMongoose = require("passport-local-mongoose"),
    User = require("./modules/user");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname+"/public"));

//passport setup/configuration
app.use(require("express-session")({
  secret: "I'm building TradeItOff",
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next) {
  res.locals.currentUser = req.user;
  next();
});

//mongoose connection
mongoose.connect("mongodb://localhost/sample",{ useNewUrlParser: true });

var con=mysql.createConnection({
  host:"localhost",
  user:"root",
  password:"ninad_123",
  database:"sample"
})

con.connect(function(err){
  if(err) console.log(err);
  console.log("connection successful");
});

// var sql="select * from products";
// var sql="insert into products values('Audi Q3 2015','https://apollo-singapore.akamaized.net/v1/files/mo7x9di16em11-IN/image;s=144x108;in_;slot=1;filename=mo7x9di16em11-IN_.jpg')";
// con.query(sql,function(err,result,fields){
//   if(err) console.log(err);
//   console.log(result);
// });


app.get("/",function(req,res){
  res.render("landing.ejs");
})

//all products
app.get("/products",function(req,res){
  var sql="select * from products";
  con.query(sql,function(err,products,fields){
    if(err) console.log(err);
    else{
      res.render("products.ejs", {products:products});
    }
  });
});
//cars
app.get("/cars",function(req,res){
  var sql="select * from products where category='cars'";
  con.query(sql,function(err,products,fields){
    if(err) console.log(err);
    else{
      res.render("cars.ejs", {products:products});
    }
  });
});

//mobiles
app.get("/mobiles",function(req,res){
  var sql="select * from products where category='mobiles'";
  con.query(sql,function(err,products,fields){
    if(err) console.log(err);
    else{
      res.render("mobiles.ejs", {products:products});
    }
  });
});

//furniture
app.get("/furniture",function(req,res){
  var sql="select * from products where category='furniture'";
  con.query(sql,function(err,products,fields){
    if(err) console.log(err);
    else{
      res.render("furniture.ejs", {products:products});
    }
  });
});

//bikes
app.get("/bikes",function(req,res){
  var sql="select * from products p where p.category='bikes'";
  con.query(sql,function(err,bikes,fields){
    if(err) console.log(err);
    else{
      res.render("bikes.ejs", {bikes:bikes});
    }
  });
});

app.post("/user",function(req,res){
  var user={
    user_id:req.user.username,
    user_name:req.body.name,
    address: req.body.address,
    phone: req.body.phone,
    gender: req.body.gender
  };
  var q = "insert into user set ?";
  con.query(q, user, function(err,results,fields){
    if(err) throw err;
    else {
      console.log(results);
      res.redirect("/");
    }
  });
});

app.get("/user/new",function(req,res){
  res.render("user_info.ejs");
});

//Add new product
app.post("/products", function(req,res){
  console.log(req);
  var product= {
    product_name: req.body.name,
    user_id: req.user.username,
    price: req.body.price,
    category: req.body.category,
    img_url: req.body.image,
    description: req.body.description
  };
  var q = "insert into products set ?";
  con.query(q, product, function(err,results,fields){
    if(err) throw err;
    else {
      res.redirect("/products");
    }
  });
});

app.get("/products/new", isLoggedIn , function(req,res){
  res.render("new.ejs");
});

app.get("/products/:id",function(req,res){
  var pid=req.params.id;
  //find campgrounds by
  var q = "select * from products where product_id=?";
  con.query(q,[pid], function(err,product,fields){
    if(err){
      console.log(err);
    }
    else{
      console.log(product)
      res.render("show1.ejs",{product:product[0]});
    }
  });
});


//Auth routes
app.get("/register",function(req,res){
  res.render("register.ejs");
});

app.post("/register",function(req,res){
  var newUser=new User({username: req.body.username});
  //register this user using passport
  User.register(newUser,req.body.password,function(err,user){
    if(err){
      console.log(err);
      return res.render("register.ejs");
    }
    passport.authenticate("local")(req,res,function(){
    res.render("user_info.ejs");
    });
  });
});

//Login routes
app.get("/login",function(req,res){
  res.render("login.ejs");
});

app.post("/login",passport.authenticate("local",{
  successRedirect:"/products",
  failureRedirect:"/login"
}), function(req,res){
  res.render("Login logic happens here");
});

//logout routes
app.get("/logout",function(req,res){
  req.logout();
  res.redirect("/products");
});

function isLoggedIn(req,res,next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect("/login");
}

app.listen(3000,function(){
  console.log("App running at 3000");
});
