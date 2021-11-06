const express=require("express");
const router = express.Router();
// to access home controller action
const homeController=require("../controllers/home_controller")
console.log("Router loaded");
router.get("/",homeController.home);
module.exports=router;