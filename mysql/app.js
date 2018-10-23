var express=require('express');
var app=express();
var bodyParser=require('body-parser');
var mysql=require('mysql');

app.use(bodyParser.urlencoded({extended: true}));

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

app.listen(3000,function(){
  console.log("App running at 3000");
});

app.get("/",function(req,res){
  res.render("landing.ejs");
})

app.get("/products",function(req,res){
  var sql="select * from products";
  con.query(sql,function(err,products,fields){
    if(err) console.log(err);
    else{
      res.render("products.ejs", {products:products});
    }
  });
});

app.post("/products",function(req,res){
  var Name=req.body.name;
  var Image=req.body.image;
  var sql="insert into products values('"+Name+"','"+Image+"')";
  con.query(sql,function(err,products,fields){
    if(err) console.log(err);
    else{
      res.redirect("/products");
    }
  });
})

app.get("/products/new",function(req,res){
  res.render("new.ejs");
});
