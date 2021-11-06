const express=require("express");
const router=express.Router();


const usersController=require("../controllers/users_controller");
const usersPostController=require("../controllers/users_post_controller");
// now we need to access controller user_controller.js from user.js route 
// router.get("/profile",usersController.profile)
router.get("/profile",usersController.profile)
router.get("/posts",usersPostController.posts)
//  router.get("/profile",usersController.profile)
// now we want this router to be accessable
console.log("router loaded for users")
module.exports=router;
