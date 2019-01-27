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

//displaying current user
app.use(function(req,res,next){
  res.locals.currentUser=req.user;
  next();
});



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
  var sql="call proc('cars')";
  con.query(sql,function(err,products,fields){
    if(err) console.log(err);
    else{
      // console.log(products);
      res.render("cars.ejs", {products:products[0]});
    }
  });
});

//Electronics
app.get("/electronics",function(req,res){
  var sql="call proc('electronics')";
  con.query(sql,function(err,products,fields){
    if(err) console.log(err);
    else{
      res.render("electronics.ejs", {products:products[0]});
    }
  });
});

//mobiles
app.get("/mobiles",function(req,res){
  var sql="call proc('mobiles')";
  con.query(sql,function(err,products,fields){
    if(err) console.log(err);
    else{
      res.render("mobiles.ejs", {products:products[0]});
    }
  });
});

//furniture
app.get("/furniture",function(req,res){
  var sql="call proc('furniture')";
  con.query(sql,function(err,products,fields){
    if(err) console.log(err);
    else{
      res.render("furniture.ejs", {products:products[0]});
    }
  });
});

//bikes
app.get("/bikes",function(req,res){
  var sql="call proc('bikes')";
  con.query(sql,function(err,products,fields){
    if(err) console.log(err);
    else{
      res.render("bikes.ejs", {products:products[0]});
    }
  });
});


//add new user
app.post("/user",function(req,res){
  var user={
    user_id:req.user.username,
    user_name:req.body.name,
    address: req.body.address,
    gender: req.body.gender,
    phone: req.body.phone
  };
  var q = "insert into user set ?";
  con.query(q, user, function(err,results,fields){
    if(err){
      res.render("valid_phone.ejs");
    }
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
  var q = "select * from products where product_id="+pid;
  con.query(q, function(err,product,fields){
    if(err){
      console.log(err);
    }
    else{
      console.log(product)
      res.render("show1.ejs",{product:product[0]});
    }
  });
});

//orders route
app.get("/orders",isLoggedIn,function(req,res){
  var user_id=req.user.username;
  var q="select * from orders where user_id =" + "'" + user_id + "'";
  con.query(q,function(err,orders,fields){
    if(err){
      console.log(err);
    }
    else{
      res.render("orders.ejs",{orders:orders});
    }
  });
});


//Buy route
app.get("/products/buy/:id/:name/:cost/:category/:seller",isLoggedIn,function(req,res){
  var product_id=req.params.id;
  var seller_id=req.params.seller;
  var order={
    user_id:req.user.username,
    seller_id:req.params.seller,
    category:req.params.category,
    product_name:req.params.name,
    product_cost:req.params.cost,
    product_id:product_id
  }
  var sql="insert into orders set ?";
  con.query(sql,order,function(err,order,fields){
    if(err){
      res.render("invalid_order.ejs");
    }
    else{
      console.log(order);
    }
  });
  var q="delete from products where product_id=?";
  con.query(q,product_id,function(err,product,fields){
    if(err){
      console.log(err);
    }
    else{
      res.render("buy.ejs",{seller_id:seller_id});
    }
  });
});

app.get("/offers", isLoggedIn , function(req,res){
  res.render("offers.ejs");
});

app.post("/review/:seller",function(req,res){
  var r=req.body.rate;
  var user=req.user.username;
  var seller=req.params.seller;
  var rate={
    user_id : user,
    seller_id : seller,
    rating : r
  }
  var q="insert into seller_rating set ?";
  con.query(q,rate,function(err,rating,fields){
    if(err){
      console.log(err);
    }
    else{
      res.redirect("/products");
    }
  })
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
