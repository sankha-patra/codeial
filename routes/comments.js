const passport=require("passport")
const express=require("express");
const router=express.Router();
// importing from posts controller
const commentsController = require("../controllers/comments_controller")
// creating comments
router.post("/create",passport.checkAuthentication,commentsController.create)
// deleting comments
router.get("/destroy/:id",passport.checkAuthentication,commentsController.destroy);

module.exports = router;