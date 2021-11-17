const passport=require("passport")
const express=require("express");
const router=express.Router();
// importing from posts controller
const commentsController = require("../controllers/comments_controller")
router.post("/create",passport.checkAuthentication,commentsController.create)


module.exports = router;