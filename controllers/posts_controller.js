//importing from post

const Post =require("../models/post")

const Comment = require("../models/comment");
const Like = require("../models/like");

module.exports.create=async function(req,res){
    try{
        let post;
        await Post.uploadedAvatar(req,res,function(err){
            if(err){
                console.log("Error in multer",err);

            }
            else
            {
                let image;
                if(req.file){
                    
                    image=Post.avatarPath+'/'+req.file.filename;
                    console.log("***Image*** ",image);
                }
                
                Post.create({
                    content:req.body.content,
                    user:req.user._id,
                    avatar:image
                },async function(err,newPost){
                    if(err){
                        console.log("Error in creating post");
                        return res.redirect('/');
                    }
                    
                    if(req.xhr){
                        console.log("Inside xhr");
                        await newPost.populate('user','name avatar')
                        return res.status(200).json({
                            data:{
                                post:newPost,
                            },
                            message:'Post created',
                        });       
                    }
                    console.log("****POST created***");
                    req.flash('success','Post Created');
                    return res.redirect('back');
                    
                });
            }
        })

    //     await Post.uploadedAvatar(req,res,async function(err){
    //         let ava;
    //         if(req.file){
                
    //             ava=Post.avatarPath + "/" + req.file.filename;
    //             console.log("***************",ava)
    //         }
    //         post=await Post.create({
    //             content:req.body.content,
    //             user:req.user._id,
    //             avatar:ava
    //         });
    //     })


    // //    await post.populate('user') 
    //    console.log("!!!!!!!!!!!!!!!!!!!",post);

    //     if(req.xhr){
      
    //         return res.status(200).json({
    //             data:{
    //                 post:post
    //             },
    //             message:"Post created"
    //         })
    //     }




    //     req.flash("success","Post published")
    //     return res.redirect("back");


    }catch(err){
        req.flash("error",err)
        return res.redirect("back");

    }
    
}
module.exports.destroy=async function(req,res){
    try{
        //saving the post to be found from the database
        //in the variiable
        let post=await Post.findById(req.params.id);
        //checking if post user matches requested user(signed in user)

    if(post.user ==  req.user.id){
        // delete the assosiated likes for post and comment both
        //when we delete a post we delete all the likes associated with the post
        //and likes associated with the comment of teh post
        //deleting likes for this post
        await Like.deleteMany({likeable:post._id,onModel:"Post"});

        //likes for thr commentys of the post
        await Like.deleteMany({_id:{$in:post.comments}});

        await Comment.deleteMany({post:req.params.id});
        post.remove();
        //deleting comment
        
        req.flash("success","Post and associated comments deleted")

        if(req.xhr){
            console.log("Inside xhr");
           
            return res.status(200).json({
                data:{
                    post:post,
                },
                message:'Post deleted',
            });       
        }
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