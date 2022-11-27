const mongoose=require('mongoose')

const courseschema=new mongoose.Schema({
    
       // title, description, video Url, topics array, duration, category,

       title:String,
       description:String,
       video_Url:String,
       // topics_array:[],
       duration:String,
       category:String




})
const coursedata=mongoose.model("user",courseschema)

module.exports=coursedata



// https://stackoverflow.com/questions/72518694/user-roles-and-rulespermission-access-in-node-js   LINK FOR ADMIN ROUTER