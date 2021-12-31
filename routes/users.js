const express=require("express");
const router=express.Router();
const passport=require("passport");
const freindcontroler=require('../controllers/freindshipcontroller');
const friendsController = require('../controllers/friends_Controller');

const usersController=require("../controllers/users_controller");
const usersPostController=require("../controllers/users_post_controller");
// now we need to access controller user_controller.js from user.js route 
// router.get("/profile",usersController.profile)


router.get("/profile/:id",passport.checkAuthentication,usersController.profile)

router.post("/update/:id",passport.checkAuthentication,usersController.update)
router.get('/search',passport.checkAuthentication,usersController.search)

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



router.get('/friends', friendsController.renderPage);
router.get('/friend-requests', friendsController.friendRequests);




router.get("/sign-out",usersController.destroySession);


router.get('/removefriend',freindcontroler.removeFreind);

// router.get("/auth/google",passport.authenticate("google",{scope:["profile","email"]}))

// router.get("auth/google/callback",passport.authenticate("google",{failureRedirect: "/users/sign-in"}),usersController.createSession);

router.get('/auth/google', passport.authenticate('google', {scope: ['profile', 'email']}));
router.get('/auth/google/callback', passport.authenticate('google', {failureRedirect: '/users/sign-in'}), usersController.createSession);


module.exports=router;
