// to controll many users

//importing models
const User = require("../models/user")
const Post = require('../models/post');
const Comment = require('../models/comment');
const fs =require("fs")
const path = require("path")
// for rendering profile page


// module.exports.profile=function(req,res){
//   User.findById(req.params.id,function(err,user){
    
    
//     return res.render("profile",{
//       title:"Profile-Page",
//       profile_user:user
//   })
//   })
  
  
// }

//////////////////////////////////////

module.exports.profile = function(req, res){
    
  User.findById(req.params.id)
  .populate({
      path: 'friends'
  })
  // .populate({
  //     path : 'posts',
  //     populate : {
  //         path : 'comments',
  //         model: 'Comment',
  //         select:{
  //             createdAt:0,
  //             updatedAt:0
  //         },
  //         populate:{
  //             path: 'user',
  //             model: 'User',
  //             select:{
  //                 posts:0,
  //                 email: 0,
  //                 password:0,
  //                 createdAt:0,
  //                 updatedAt:0
  //             }
  //         }
  //     }
  // })
  .exec(function(err, user){       
      let isFriend=false;
      let ispending = false;
      for(friendship of user.friends){
          // console.log("in users controller")
          // console.log(friendship);
          // // console.log(req.user._id);

          

          //for finding is request is pending or accepted

          if(friendship.user_id==req.user.id || friendship.friend_id==req.user.id){
               
              ispending = true;
          }


          if((friendship.user_id==req.user.id || friendship.friend_id==req.user.id) && (friendship.request_accepted)){
              isFriend = true;
              ispending = false;
              break;
          }
      }

     
      return res.render('profile', {
                  title: 'Profile-Page',
                  profile_user : user,
                  isFriend : isFriend,
                  ispending:ispending
              });
  });
  
};








module.exports.search= async function(req,res)
{ try{ 

  console.log("hii")
       
      
        const regex = new RegExp(escapeRegex(req.query.name), 'gi');
        console.log("hii")
        

        let user=await User.find({name:regex});
        console.log("hii")
        if(user)
        {
        

            return res.render('user_searchresult', {
                title: 'Search Results',
                users: user
        });
    }else{
        req.flash('error','user not found');
        return res.redirect('/');
    }
 

     }catch(err)
     {
         
         return res.redirect('back');
     }
}
// function for fuzzy search using regular expressions 

function escapeRegex(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};



module.exports.update= async function(req,res){
  // if(req.user.id == req.params.id){
  //   User.findByIdAndUpdate(req.params.id,req.body,function(err,user){
  //     return res.redirect("back")
  //   })
  // }else{
  //   res.status(401).send("Unautherized");
  // }
    if(req.user.id == req.params.id){
      try{
        // step 1
        let user = await User.findByIdAndUpdate(req.params.id);
        User.uploadedAvatar(req,res,function(err){
          if(err){
            console.log("multer error",err)
          }
          
          user.name=req.body.name;
          user.bio=req.body.bio;
          user.email=req.body.email;

          if(req.file){
            // this is saving the path of uploaded file into the avatar field in user
            if(user.avatar){
              fs.unlinkSync(path.join(__dirname,"..",user.avatar))
            }

            user.avatar=User.avatarPath + "/" + req.file.filename;
            
          }
          user.save();
          return res.redirect("back");


        })


      }catch(err){
        req.flash("error",err)
        return res.redirect("back");

      }

    }else{
      req.flash("error","Unauthorized")
      return res.status(401).send("Unautherized");
    }
  
}









//for rendering posts page
module.exports.posts=function(req,res){
  return res.render("posts",{
      title:"Posts"
  })
  
}


//render the sign up page
module.exports.signUp=function(req,res){
 
  if(req.isAuthenticated()){
    return res.redirect("/users/profile")
  }
 
 
 
  return res.render("user_sign_up",{
    title:"Codeil | Sign Up"
  })
}


//render the sign in page
module.exports.signIn=function(req,res){

  if(req.isAuthenticated()){
    return res.redirect("/users/profile")
  }

  return res.render("user_sign_in",{
    title:"Codeial | Sign In"
  })
}


//when req comes in this controller fetch the view and send it to browser

// get the sign up data
module.exports.create = function(req, res){
  if (req.body.password != req.body.confirm_password){
      return res.redirect('back');
  }
   // if passowrds are same we try to find a user with same email id
//   // becasuse email should be unique

  User.findOne({email: req.body.email}, function(err, user){
      if(err){console.log('error in finding user in signing up'); return}

       //when there is no user
     // we create one
      if (!user){
          User.create(req.body, function(err, user){
            console.log(err);
              if(err){console.log('error in creating user while signing up'); return}

              return res.redirect('/users/sign-in');
          })
          //     // if user if already present
//     // we redirect back to sign up page
      }else{
          return res.redirect('back');
      }

  });
}







// // get the sign in data and create session for the user
// module.exports.createSession=function(req,res){
//   //flash message
//   req.flash("Sucess","Logged in Successfuly")
//   // user signed so redirect
//   return res.redirect("/");


// }
// module.exports.destroySession = function(req,res){



//   req.logout();
//   //flash message
// req.flash("Sucess","You have Logged out")
//   return res.redirect("/")
// }

// // sign in and create a session for the user
// module.exports.createSession = function(req, res){
//   req.flash('success', 'Logged in Successfully');
//   return res.redirect('/');
// }

// module.exports.destroySession = function(req, res){
//   req.logout();
//   req.flash('success', 'You have logged out!');


//   return res.redirect('/');
// }

// sign in and create a session for the user
module.exports.createSession = function(req, res){
  req.flash('success', 'Logged in Successfully');
  return res.redirect('/');
}

module.exports.destroySession = function(req, res){
  req.logout();
  req.flash('success', 'You have logged out!');


  return res.redirect('/');
}











// now this controller is ready to get accessed by a router
// that route needs to get accessed by browser
// browser tells in which route we need to go and controller returns the data it has
// every time we ceate a controller we create a route so that we can access it through route