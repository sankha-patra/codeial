const express=require("express");
const router=express.Router();


const usersController=require("../controllers/users_controller");
const usersPostController=require("../controllers/users_post_controller");
// now we need to access controller user_controller.js from user.js route 
// router.get("/profile",usersController.profile)


router.get("/profile",usersController.profile)


router.get("/posts",usersController.posts)



// router.get("/posts",usersPostController.posts)
//  router.get("/profile",usersController.profile)
// now we want this router to be accessable
console.log("router loaded for users")

router.get("/sign-up",usersController.signUp);

router.get("/sign-in",usersController.signIn);


router.post("/create",usersController.create);

module.exports=router;
