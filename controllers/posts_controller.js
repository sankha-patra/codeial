//importing from post

const Post =require("../models/post")

const Comment = require("../models/comment")

module.exports.create=async function(req,res){
    try{
        await Post.create({
            content:req.body.content,
            user:req.user._id
      
        });
        req.flash("success","Post published")
        return res.redirect("back");

    }catch(err){
        req.flash("error",err)
        return res.redirec("back");

    }
    
}
module.exports.destroy=async function(req,res){
    try{
        //saving the post to be found from the database
        //in the variiable
        let post=await Post.findById(req.params.id);
        //checking if post user matches requested user(signed in user)

    if(post.user ==  req.user.id){
        post.remove();
        //deleting comment
        await Comment.deleteMany({post:req.params.id});
        req.flash("success","Post and associated comments deleted")
        return res.redirect("back");

    }else{
        req.flash("error","You cannot delete this Post")
        return res.redirect("back");
    }

    }catch(err){
        req.flash("error",err)
        return res.redirect("back");
        
    }

    
}