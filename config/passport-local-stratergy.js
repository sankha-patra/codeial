const passport = require("passport")
const LocalStratergy =  require("passport-local").Strategy;
const User=require("../models/user");

//authentication user passport
// we need to tell passport to use local stratergy
passport.use(new LocalStratergy({
    //username field from schema
    usernameField:"email",
    passReqToCallback:true
},
function(req,email,password,done){
    //done is callback function
    // find user and establish identity
    User.findOne({email: email},function(err,user){
        if(err){
            
            req.flash("error",err);
            return done(err);

        }
        if(!user || user.password!=password){
           req.flash("error","Invalid username/password")
            return done(null,false);
        }
        // if the user is found
         //null because no error is there user because user is there
        return done(null,user);
    });
// }

}))

// serialising the user to decide which key is to be kept in cookies
passport.serializeUser(function(user,done){
    //storing users id into the cookie in encrypted format
    done(null,user.id);


})

//deserialising the user from the key in cookie and cookie is sent to browser automatically
passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
        if(err){
            console.log("error in finding user passport")
            return done(err);

        }
        //null because no error is there user because user is there
        return done(null,user)
    })
})


//sending data of current user to views
//check if user is authenticated

passport.checkAuthentication = function(req,res,next){
    //if user is signed in,the pass on the req to next function that is
    //controllers action
   if(req.isAuthenticated()){
       return next();
   } 
   //if user is not signed in
   return res.redirect("/users/sign-in");
}

//set the user for thr views
passport.setAuthenticatedUser=function(req,res,next){
    if(req.isAuthenticated()){
        //whenever a user is signed in his info is storeed in req.user
        //req.user contains current signed in user from the session cookie and we
        //are just sending this to locals for views
        res.locals.user=req.user;
    }
    next();
}
module.exports=passport