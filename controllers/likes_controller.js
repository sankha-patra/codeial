const Like = require("../models/like")
const Comment = require("../models/comment")
const Post = require("../models/post")


module.exports.toggleLike = async function(req,res){
    try{
        console.log("%%%%%%%%%%%%%%%%%%%")

        // likes/toggle/?id=abcdef&type=Post
        let likeable;
        let deleted = false;

        if(req.query.type=="Post"){
            likeable = await Post.findById(req.query.id).populate("likes");
        }else{
            likeable = await Comment.findById(req.query.id).populate("likes");
        }

        //check if a like alredy exists
        let existingLike = await Like.findOne({
            likeable:req.query.id,
            onModel:req.query.type,
            user:req.user._id
        })
        //if a like already exists delete it
        if(existingLike){
            likeable.likes.pull(existingLike._id);
            likeable.save();
            existingLike.remove();
            req.flash('success', 'Like successfully removed');
            deleted = true;
        }
        else{
            //make a new like
            console.log("^^^^^^^^^^^^^^^^^^^^^",req.user._id,req.query.id,req.query.type)
            console.log("likes")
            let newLike = await Like.create({
                user:req.user._id,
                likeable:req.query.id,
                onModel:req.query.type
                
            })

            likeable.likes.push(newLike._id);
            likeable.save();
           
            req.flash('success', 'You Liked');
            

        }

       

        return res.json(200,{
            message:"Request successfull",
            data:{
                deleted:deleted
            }
        })
        return res.redirect('/'); 

    }catch(err){

        console.log(err);
        req.flash('error', 'Some Error Ocurred');
        return res.redirect('/');

    }
}