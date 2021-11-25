const Post = require("../../../models/post")
const Comment = require("../../../models/comment")

module.exports.index= async function(req,res){

    let posts=await Post.find({})
    .populate("user")
    .populate({
        path:"comments",
        populate:{
            path:"user"
        }
    });

    return res.json(200,{
        message:"lists of posts 1",
        posts:posts
    })
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
        // req.flash("success","Post and associated comments deleted")
        return res.json(200,{
            message:"post and associated comments deleted"
        });

    }else{
        // req.flash("error","You cannot delete this Post")
        // return res.redirect("back");
        return res.json(401,{
            message:"You cannot delete the post"
        });
    }

    }catch(err){
        // req.flash("error",err)
        console.log("error",err)
        return res.json(500,{
            message:"Internal server error"
        });
        
    }

    
}