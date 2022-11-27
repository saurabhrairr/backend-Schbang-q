const mongoose=require('mongoose')

const userschema=new mongoose.Schema({
    
       name:{
              type:String,
              default:"Employee"

       },
       email:{
              type:String,
              require:true,
              unique:true,
              // match:/.+\@.+.+\.+/,
              match:/.+\@.+\.+/
             
       },
       password:String

})
const userdata=mongoose.model("user1",userschema)

module.exports=userdata