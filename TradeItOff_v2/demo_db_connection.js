var mysql=require('mysql');
var con=mysql.createConnection({
  host:"localhost",
  user:"root",
  password:"ninad_123",
  database:"company1"
});

// con.connect(function(err){
//   if(err) console.log(err);
//   console.log("connection successful!");
// });

con.connect(function(err){
  if(err) console.log(err);
  con.query("select dname from dept",function(err,result,fields){
    if(err) console.log(err);
    else{
      console.log(result);
    }
  });
});

con.query("select * from dept",function(err,result,fields){
  if(err) console.log(err);
  else{
    console.log(result[1].dname);
  }
});
