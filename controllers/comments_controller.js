const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create = function(req, res){
    Post.findById(req.body.post, function(err, post){
        console.log("post")

        if (post){
            Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            }, function(err, comment){
                // handle error
                if(err){
                    
                    req.flash("error","Comment cannot be published")
                }

                post.comments.push(comment);
                post.save();
                req.flash("success","Comment published")

                res.redirect('/');
            });
        }

    });
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