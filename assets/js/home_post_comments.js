// Let's implement this via classes

// this class would be initialized for every post on the page
// 1. When the page loads
// 2. Creation of every post dynamically via AJAX

class PostComments{
    // constructor is used to initialize the instance of the class whenever a new instance is created
    constructor(postId){
        this.postId = postId;
        this.postContainer = $(`#post-${postId}`);
        this.newCommentForm = $(`#post-${postId}-comments-form`);

        this.createComment(postId);

        let self = this;
        // call for all the existing comments
        $(' .delete-comment-button', this.postContainer).each(function(){
            self.deleteComment($(this));
        });
    }


    createComment(postId){
        let pSelf = this;
        this.newCommentForm.submit(function(e){
            e.preventDefault();
            let self = this;

            $.ajax({
                type: 'POST',
                url: '/comments/create',
                data: $(self).serialize(),
                success: function(data){
                    let newComment = pSelf.newCommentDom(data.data.comment);
                    $(`#post-comments-${postId}`).prepend(newComment);
                    pSelf.deleteComment($(' .delete-comment-button', newComment));

                    // CHANGE :: enable the functionality of the toggle like button on the new comment
                    new toggleLike($(' .toggle-like-button', newComment));
                    new Noty({
                        theme: 'sunset',
                        text: "Comment published!",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1600
                        
                    }).show();

                }, error: function(error){
                    console.log(error.responseText);
                }
            });


        });
    }


    newCommentDom(comment){
        // CHANGE :: show the count of zero likes on this comment

        return $(`<li id="comment-${ comment._id }">




                        <p>
                       
                      
                        <img src="https://cdn1.iconfinder.com/data/icons/user-pictures/100/unknown-512.png" class='header-img' width="10%" height="10%" style="border:2px solid black;">

                        
                        <div class="cmnt" style="border-radius: 15px;align-items: center;display: inline-block;border: 4px solid #1b789c ;padding: 15px;background-color:lightgrey">
                        
                        ${comment.user.name} :
                         ${comment.content}
  
                            
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <a class="delete-comment-button" href="/comments/destroy/${comment._id}"><i class="fas fa-trash-alt fa-2x" style="color: orangered;"></i></a>
                                
                            </div>

                            <br>
                            <br>
                            
                            
                           
                            

                           
                            <small>
                            
                                <a class="toggle-like-button" data-likes="0" href="/likes/toggle/?id=${comment._id}&type=Comment" style="text-decoration: none;color: #1b789c;"">
                                <i class="fas fa-heart fa-2x" style="color: orangered;">&nbsp</i> 0 Likes
                                </a>
                            
                            </small>

                        </p>    

                </li>`);
    }


    deleteComment(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();

            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function(data){
                    $(`#comment-${data.data.comment_id}`).remove();

                    new Noty({
                        theme: 'sunset',
                        text: "Comment Deleted",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1600
                        
                    }).show();
                },error: function(error){
                    console.log(error.responseText);
                }
            });

        });
    }
}