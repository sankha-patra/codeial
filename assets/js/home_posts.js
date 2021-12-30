{   
    // method to submit the form data for new post using AJAX
    let createPost = function(){
        let newPostForm = $('#new-post-form');

        newPostForm.submit(function(e){
            e.preventDefault();
            console.log(newPostForm[0])
            var dataForm = new FormData(newPostForm[0])
            console.log("////////////////",dataForm)
            $.ajax({
                type: 'POST',
                url: '/posts/create',
                data: dataForm,
                processData: false,
                contentType: false,
                success: function(data){

                    console.log("@@@@@@@",data.data)
                    let newPost = newPostDom(data.data.post);
                    $('#posts-list-container>ul').prepend(newPost);
                    deletePost($(' .delete-post-button', newPost));

                    // call the create comment class
                    new PostComments(data.data.post._id);

                    // CHANGE :: enable the functionality of the toggle like button on the new post
                    new toggleLike($(' .toggle-like-button', newPost));

                    new Noty({
                        theme: 'sunset',
                        text: "Post published!",
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


    // method to create a post in DOM
    let newPostDom = function(post){
        // CHANGE :: show the count of zero likes on this post
        return $(`<div class="whole " id="p-${ post._id }">

        <li id="post-${post._id}">
        <br><br><br>
        <img  class="header-img"  src="${post.user.avatar}" width="10%" height="10%" alt="" style="border:2px solid black;">
        <br>

        <div class="pst" style="border-radius: 15px;align-items: center;display: inline-block;border: 4px solid #00bbf0 ;padding: 15px;color:color: #81ecec;">
         ${post.user.name} : 
         ${post.content}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

       
       
                   
                        
                        
         <a class="delete-post-button"  href="/posts/destroy/${ post._id }"><i class="fas fa-trash fa-2x" style="color: orangered;"></i></a>

         </div>
        

        <br>
        <br>
        

        


        <p>
      
        
       


         <img src="${post.avatar}"  width="100%" height="50%" alt=" "  box-shadow:0 2px 20px -3px black;>
            
                       
                        
                        <br>
                       
                        <br>
                        <small>
                            
                                <a class="toggle-like-button" data-likes="0" href="/likes/toggle/?id=${post._id}&type=Post"  style="text-decoration: none;color:#1b789c;"">
                                <i class="fas fa-heart fa-2x" style="color: orangered;">&nbsp</i> 0 Likes
                                </a>

                               
                            
                        </small>

                    </p>
                    <div class="post-comments">
                        
                            <form id="post-${ post._id }-comments-form" action="/comments/create" method="POST">

                            <div class="form_control" style="display:inline-block;">


                                <input type="text" name="content" placeholder="Write comment..." required>
                                
                                </div>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <input class="button" type="submit" value="Add Comment">

                                
                                
                                
                                <input type="hidden" name="post" value="${ post._id }" >
                            </form>
                            <br><br>
               
                
                        <div class="post-comments-list">
                            <ul id="post-comments-${ post._id }">
                                
                            </ul>
                        </div>
                    </div>
                    
                </li>
        </div>`)
    }


    // method to delete a post from DOM
    let deletePost = function(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();

            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function(data){
                    console.log("^^^@@@@@@@@@",data.data.post)
                    $(`#post-${data.data.post._id}`).remove();
                    $(`#p-${data.data.post._id}`).remove();
                    new Noty({
                        theme: 'sunset',
                        text: "Post Deleted",
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





    // loop over all the existing posts on the page (when the window loads for the first time) and call the delete post method on delete link of each, also add AJAX (using the class we've created) to the delete button of each
    let convertPostsToAjax = function(){
        $('#posts-list-container>ul>li').each(function(){
            let self = $(this);
            let deleteButton = $(' .delete-post-button', self);
            deletePost(deleteButton);

            // get the post's id by splitting the id attribute
            let postId = self.prop('id').split("-")[1]
            new PostComments(postId);
        });
    }



    createPost();
    convertPostsToAjax();
}