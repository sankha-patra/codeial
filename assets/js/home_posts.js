// {   
//     // method to submit the form data for new post using AJAX
//     let createPost = function(){
//         let newPostForm = $('#new-post-form');

//         newPostForm.submit(function(e){
//             e.preventDefault();

//             $.ajax({
//                 type: 'post',
//                 url: '/posts/create',
//                 data: newPostForm.serialize(),
//                 success: function(data){
//                     let newPost = newPostDom(data.data.post);
//                     $('#posts-list-container>ul').prepend(newPost);
//                 }, error: function(error){
//                     console.log(error.responseText);
//                 }
//             });
//         });
//     }


//     // method to create a post in DOM
//     let newPostDom = function(post){
//         return $(`<li id="post-${post._id}">
//                     <p>
                        
//                         <small>
//                             <a class="delete-post-button"  href="/posts/destroy/${ post.id }">X</a>
//                         </small>
                       
//                         ${ post.content }
//                         <br>
//                         <small>
//                         ${ post.user.name }
//                         </small>
//                     </p>
//                     <div class="post-comments">
                        
//                             <form action="/comments/create" method="POST">
//                             <div class="form_control" style="display:inline-block;">
//                                 <input type="text" name="content" placeholder="Type Here to add comment..." required autofocus>

//                                 </div>
                               
                                
//                                 <input class="button" type="submit" value="Add Comment">
//                                 <input type="hidden" name="post" value="${ post._id }" >
//                             </form>
               
                
//                         <div class="post-comments-list">
//                             <ul id="post-comments-${ post._id }">


//                             <br>
//                             <i class="fas fa-comments" style="color: #42b883;"></i>
//                             ${comment.user.name}:
//                             <small>
//                               ${comment.content }
                              
//                                 <small>
//                                   <a href="/comments/destroy/${ comment.id }"><i class="fas fa-trash-alt" style="color: orangered;"></i></a>
//                                 </small>
//                                 <br>

                                
//                             </ul>
//                         </div>
//                     </div>
                    
//                 </li>`)
//     }


//         // method to delete a post from DOM
//     let deletePost = function(deleteLink){
//         $(deleteLink).click(function(e){
//             e.preventDefault();

//             $.ajax({
//                 type: 'get',
//                 url: $(deleteLink).prop('href'),
//                 success: function(data){
//                     $(`#post-${data.data.post_id}`).remove();
//                 },error: function(error){
//                     console.log(error.responseText);
//                 }
//             });

//         });
//     }




//     createPost();
// }