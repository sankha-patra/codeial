//root index for all routess

const express=require("express");
const router = express.Router();
// to access home controller action
const homeController=require("../controllers/home_controller")
//const usersController=require("../controllers/users_controller");
console.log("Router loaded for home page");


// this router handles home
router.get("/",homeController.home);


//this route handles users requests
router.use('/users',require('./users'));
//router.use('/posts',require('./usersPosts'));
//router.get("/profile",usersController.profile)


//for comments
router.use('/comments',require('./comments'));


//for comments
router.use('/posts',require('./posts'));
//for likes

router.use('/likes',require('./likes'));

//any req to home page goes to homecontroller .home
// any req to users goes to users route

//for any further routes access from here
// router.use("/routerName",require("./routerfile"));


router.use("/api",require("./api"))
router.use('/friends', require('./friends'));
router.use('/freind',require('./freind'));
module.exports=router;