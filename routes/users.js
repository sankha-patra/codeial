const express=require("express");
const router=express.Router();
const passport=require("passport");


const usersController=require("../controllers/users_controller");
const usersPostController=require("../controllers/users_post_controller");
// now we need to access controller user_controller.js from user.js route 
// router.get("/profile",usersController.profile)


router.get("/profile",passport.checkAuthentication,usersController.profile)


router.get("/posts",usersController.posts)



// router.get("/posts",usersPostController.posts)
//  router.get("/profile",usersController.profile)
// now we want this router to be accessable
console.log("router loaded for users")

router.get("/sign-up",usersController.signUp);

router.get("/sign-in",usersController.signIn);


router.post("/create",usersController.create);

// create session here matches with bthe name created in views sign in
//use passport as a middle ware to authenticate
router.post("/create-session",passport.authenticate(
    // passport 1st authenticates it if the authentication is done then returns the user(call back function)
    
    "local",

    //if authentication not done then it redirects to sign in page
    {failureRedirect:"/users/sign-in"},
),usersController.createSession);




router.get("/sign-out",usersController.destroySession);
module.exports=router;
