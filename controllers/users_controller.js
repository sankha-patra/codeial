// to controll many users

//importing models
const User = require("../models/user")

// for rendering profile page
module.exports.profile=function(req,res){
  return res.render("profile",{
      title:"profile"
  })
  
}

//for rendering posts page
module.exports.posts=function(req,res){
  return res.render("posts",{
      title:"posts"
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

// get the sign in data and create session for the user
module.exports.createSession=function(req,res){
  // user signed so redirect
  return res.redirect("/");


}
module.exports.destroySession = function(req,res){
  req.logout();
  return res.redirect("/")
}


// now this controller is ready to get accessed by a router
// that route needs to get accessed by browser
// browser tells in which route we need to go and controller returns the data it has
// every time we ceate a controller we create a route so that we can access it through route