const Comment = require('../models/comment');
const Post = require('../models/post');
const commentsMailer = require("../mailers/comments_mailer")
const queue = require('../config/kue');
const commentEmailWorker = require('../workers/comment_email_worker');
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
                user: req.user._id
            });
            console.log("*******",comment)
            post.comments.push(comment);
            post.save();
            
            comment = await comment.populate("user", "name email")
            // commentsMailer.newComment(comment);

            
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
                        comment: comment
                    },
                    message: "comment created!"
                });
            }


            req.flash('success', 'Comment published!');

            return res.redirect('/');
        }
    }catch(err){
        console.log("error in catch :",err)
        req.flash('error', err);
        return;
    }
    
}


module.exports.destroy=function(req,res){
    Comment.findById(req.params.id,function(err,comment){
        if(comment.user == req.user.id){
            // we delete the id of comment which has to be deleted 
            // from the array of comments inside posts
            let postId = comment.post;
            comment.remove();
            Post.findByIdAndUpdate(postId,{ $pull:{comments:req.params.id}},function(err,post){
                req.flash("success","Comment deleted")
                return res.redirect("back")
            })
        }else{
            req.flash("success","Comment cannot be deleted")
            return res.redirect("back");
        }
    });
}