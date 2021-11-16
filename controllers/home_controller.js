const Post=require("../models/post")


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
    Post.find({}).populate("user").exec(function(err,posts){
        return res.render("home",{
            title:"Home",
            posts:posts
        });
    })




}


//module.exports.actionName=function(req,res){}
// using this we can make other controllers wwith different actions using their action name