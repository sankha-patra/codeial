const Comment = require('../models/comment');
const Post = require('../models/post');
const commentsMailer = require("../mailers/comments_mailer")
const queue = require('../config/kue');
const commentEmailWorker = require('../workers/comment_email_worker');
const Like = require("../models/like");
// module.exports.create = async function(req, res){
//     let post = Post.findById(req.body.post, async function(err, post){
//         console.log("post")

//         if (post){
//             Comment.create({
//                 content: req.body.content,
//                 post: req.body.post,
//                 user: req.user._id
//             },  function(err, comment){
//                 // handle error
//                 if(err){
                    
//                     req.flash("error","Comment cannot be published")
//                 }

//                 post.comments.push(comment);
//                 post.save();
                 
//                 comment =  comment.populate('user', 'name email');
//                 commentsMailer.newComment(comment);

//                 req.flash("success","Comment published")

//                 res.redirect('/');
//             });
//         }

//     });
// }
module.exports.create = async function(req, res){

    try{
        let post = await Post.findById(req.body.post);

        if (post){
            // let comment = await 
           let comment= await Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id,
                
            });
            // console.log("*******",comment)
            // console.log(req.body.name)
            
            post.comments.push(comment);
            post.save();
            
            comment = await comment.populate("user", "name email avatar")
            post = await post.populate("user", "name email")
            console.log("llllllllllll",comment.user.name)
           
            commentsMailer.newCommentPost(comment,post);

            
            let job = queue.create('emails', comment).save(function(err){
                if (err){
                    console.log('Error in sending to the queue', err);
                    return;
                }
                console.log('job enqueued', job.id);

            })
            
            if (req.xhr){
                
    
                return res.status(200).json({
                    data: {
                        comment: comment,
                        

                    },
                    message: "comment created!"
                });
            }


            req.flash('success', 'Comment published!');

            return res.redirect('back');
        }
    }catch(err){
        console.log("error in catch :",err)
        req.flash('error', err);
        return;
    }
    
}


// module.exports.destroy=async function(req,res){


//     try{
//        let comment = await Comment.findById(req.params.id)
//             if(comment.user == req.user.id){
//                 // we delete the id of comment which has to be deleted 
//                 // from the array of comments inside posts
//                 let postId = comment.post;
//                 comment.remove();
//                 let post = await Post.findByIdAndUpdate(postId,{ $pull:{comments:req.params.id}},function(err,post){
    
    
//                     //destroy the associated likes for this comment
//                    await Like.deleteMany({likeable:comment._id,onModel:"Comment"})
    
    
//                     req.flash("success","Comment deleted")
//                     return res.redirect("back")
//                 })


//             }else{
//                 req.flash("error","You cannot delete this Post")
//                 return res.redirect("back");
//             }

//     }catch(err){

//         req.flash("success","Comment cannot be deleted")
//         return res.redirect("back");


//     }
//     // Comment.findById(req.params.id,function(err,comment){
//     //     if(comment.user == req.user.id){
//     //         // we delete the id of comment which has to be deleted 
//     //         // from the array of comments inside posts
//     //         let postId = comment.post;
//     //         comment.remove();
//     //         Post.findByIdAndUpdate(postId,{ $pull:{comments:req.params.id}},function(err,post){


//     //             //destroy the associated likes for this comment
//     //             Like


//     //             req.flash("success","Comment deleted")
//     //             return res.redirect("back")
//     //         })
//         // }else{
//         //     req.flash("success","Comment cannot be deleted")
//         //     return res.redirect("back");
//         // }
//     // });
// }





















module.exports.destroy = async function(req, res){

    try{
        let comment = await Comment.findById(req.params.id);

        if (comment.user == req.user.id){

            let postId = comment.post;

            comment.remove();

            let post = Post.findByIdAndUpdate(postId, { $pull: {comments: req.params.id}});

            // CHANGE :: destroy the associated likes for this comment
            await Like.deleteMany({likeable: comment._id, onModel: 'Comment'});


            // send the comment id which was deleted back to the views
            if (req.xhr){
                return res.status(200).json({
                    data: {
                        comment_id: req.params.id
                    },
                    message: "Post deleted"
                });
            }


            req.flash('success', 'Comment deleted!');

            return res.redirect('back');
        }else{
            req.flash('error', 'Unauthorized');
            return res.redirect('back');
        }
    }catch(err){
        req.flash('error', err);
        return;
    }
    
}