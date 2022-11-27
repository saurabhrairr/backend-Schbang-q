const express=require('express')
const mongoose=require('mongoose')
const app=express()
const userdata=require("./model/userschema")
const coursedata=require('./model/courseschema')
const bcrypt = require("bcryptjs");
const jwt=require('jsonwebtoken')
const { urlencoded } = require('express')
const salt=10
SECRET_KEY="3de9a27eff493272a603a3ed0216cdc8db48918f2e1039d305d1cb8f3fe16a1b63610e3b3adabf3134a1261a94cdf8b93da0bb2b0f5844fd1cf6a9e5eed2aa1d"


app.use(express.json())
app.use(urlencoded({extended:false}))
app.listen(4000,(err)=>
{
       if(!err)
       {
              console.log("port connect");
       }else
       {
              console.log(err);
       }
})

mongoose.connect("mongodb://localhost/mobile",(err)=>
{
       if(!err)
       {
           console.log("db connect");    
       }else

       {
              console.log(err);
       }
})







app.post("/login",(req,res)=>
{
       userdata.find({email:req.body.email}).then((user)=>{
              if(user.length)
              {
                     bcrypt.compare(req.body.password,user[0].password).then((val)=>
                     {
                            if(val)
                            {
                                   const authtoken=jwt.sign(req.body.email,SECRAT_KEY)
                                   res.status(200).send({authtoken})
                            }
                     })
                     
              }else
              {
                     res.status(400).send("user not exit")
              }
       })
})


app.post("/register",(req,res)=>
{
       bcrypt.genSalt(salt,(err,hashsalt)=>{
              bcrypt.hash(req.body.password,hashsalt,(err,passwordhash)=>{
             userdata.create({

                 name:req.body.name,
                 email:req.body.email,
                 password:passwordhash
             }).then((data)=>
             {
              res.status
              (200).send({data})
             }).catch((err)=>{
              res.status(400).send(err)
             })
              })
       })
})

app.post("/logout", (req, res) => {
       res
         .status(200)
         .send({ status: "success", message: "Loggedout successfully" });
     });



app.post("/admin",(req,res)=>{

       coursedata.create({
       title:req.body.title,
       description:req.body.description,
       video_Url:req.body.video_Url,
       topics_array:req.body.topics_array,
       duration:req.body.duration,
       category:req.body.category

       }).then((data)=>
       {
              res.status(200).send({data})
       }).catch((err)=>{
              res.status(400).send(err)
       })
})



app.put("/admin/:postId",(req,res)=>{

       coursedata.updateOne({_id: req.params.postId }, req.body).then((data)=>
       {
              res.status(200).send(data)
       }).catch((err)=>{
              res.status(400).send(err)
       })
})

app.delete("/admin/:postId",(req,res)=>
{
       coursedata.deleteOne({ _id: req.params.postId }, req.body)
       .then((posts) => {
         res.status(200).send("user delete  successfully");
       }).catch((err)=>
       {
            res.status(400).send(err)
       })
})