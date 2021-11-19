const { populate } = require("../models/post");
const Post=require("../models/post")
const User =  require("../models/user")

module.exports.home=async function(req,res){
    console.log(req.cookies)
    try{

         //populate the user of each post
    //populating multiple models comments,user of the comments
    let posts=await Post.find({})
    .populate("user")
    .populate({
        path:"comments",
        populate:{
            path:"user"
        }
    });
    let users=await User.find({});
    return res.render("home",{
        title:"Home",
        posts:posts,
        all_users:users
    });
       

    }catch(err){
        console.log("error",err);
        return;

    }

    // we edited the cookie
    // res.cookie("user_id",25)
    //rendering the view home using ejs


  

   

    
    
    




}


//module.exports.actionName=function(req,res){}
// using this we can make other controllers wwith different actions using their action name