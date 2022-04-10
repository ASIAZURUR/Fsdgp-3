const express=require("express");
// const path=require("path");
const app=express();
const cors=require("cors");
const jwt = require('jsonwebtoken')
const bodyParser = require("body-parser");
const bycrypt=require('bcryptjs');
const Userdata = require("./src/model/User");

//  app.use(express.static(path.join(__dirname,'static')))


// app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
app.use(cors());
username='admin@role.com';
password='1234Group3';
function verifyToken(req, res, next) {
  if(!req.headers.authorization) {
    return res.status(401).send('Unauthorized request')
  }
  let token = req.headers.authorization.split(' ')[1]
  if(token === 'null') {
    return res.status(401).send('Unauthorized request')    
  }
  let payload = jwt.verify(token, 'secretKey')
  if(!payload) {
    return res.status(401).send('Unauthorized request')    
  }
  req.userId = payload.subject
  next()
}
app.post("/api/customer/register",(req,res)=>{
    res.header("Access-Control-Allow-Origin","*")
    res.header('Access-Control-Allow-Methods:GET,PUT,POST,PATCH,DELETE,OPTIONS');

    console.log(req.body);
    const{email}=req.body;
  
        Userdata.findOne({email:email})
        .then(user=>{
            if(user){
          
          res.send({success:false,data:'Email is already registered '})}
          else{
    var user={
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        phone:req.body.phone,
        email:req.body.email,
        password:req.body.password

    }
    var user=new Userdata(user);
    bycrypt.genSalt(10,(err,salt)=>
    bycrypt.hash(user.password,salt,(err,hash)=>{
        if(err) throw err;
        //Set password to hashed
        user.password=hash;
 
    user.save()
    .then(user=>{
      res.status(200).send({success:true,data:user})
    }) 
 .catch(err=>console.log(err)
 
 )
    }))}
  })
})
app.post("/api/customer/login",(req,res)=>{
 

  // let userData = req.body
  Userdata.findOne({
    email: req.body.email,
  })
  .then(user=>{
    console.log(user);
    
        if (!user) {

          res.send({success:false,data:'Invalid Username or Password !'})
        } 
        // if ( password !== userData.password) {
        //   res.status(401).send('Invalid Password')}
     else if(user!=null){
        let passwordIsValid = bycrypt.compareSync(
          req.body.password,
          user.password
        );
    
      if (!passwordIsValid) {
          return res.send({
            // accessToken: null,
          success:false,
            data: "Invalid  Username or Password!",
          });
       }
         else {
          let payload = {subject: username+password}
          let token = jwt.sign(payload, 'secretKey')
          res.status(200).send({success:true,tokens:token})
        }}
      })
})
app.get("/api/customer/me",(req,res)=>{
  // res.header("Access-Control-Allow-Origin","*")
  // res.header("Access-COntrol-Allow-Methods:GET,POST,PATCH,PUT,DELETE,OPTIONS")
    // const customer=Userdata.findById(req.user.id)
            //  console.log(customer);
//             var MongoClient = require('mongodb').MongoClient;
// var url = "mongodb://localhost:27017/";

// MongoClient.connect(url, function(err, db) {
//   if (err) throw err;
  
//             var dbo = db.db("Chatapp");
//           var profile = dbo.collection("users").findOne(req.user.id)
// var user={
//   firstName:req.body.firstName,
//   lastName:req.body.lastName,
//   phone:req.body.phone,
//   email:req.body.email,
//   password:req.body.password

// }
console.log(req.user);
                  res.send({success:true,data:req.user})
// })
              
})

app.listen(3001)