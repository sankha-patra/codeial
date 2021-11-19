const { populate } = require("../models/post");
const Post=require("../models/post")
const User =  require("../models/user")

module.exports.home=function(req,res){
    console.log(req.cookies)

    // we edited the cookie
    // res.cookie("user_id",25)
    //rendering the view home using ejs


    // Post.find({},function(err,posts){
    //     return res.render("home",{
    //         title:"Home",
    //         posts:posts
    //     });
    
    // });


    //return res.end("<h1>Express is up for Codeial!!!</h1>")

    //populate the user of each post
    //populating multiple models comments,user of the comments
    Post.find({})
    .populate("user")
    .populate({
        path:"comments",
        populate:{
            path:"user"
        }
    })
    .exec(function(err,posts){

        User.find({},function(err,users){
            return res.render("home",{
                title:"Home",
                posts:posts,
                all_users:users
            });

        });
        
    })




}


//module.exports.actionName=function(req,res){}
// using this we can make other controllers wwith different actions using their action name