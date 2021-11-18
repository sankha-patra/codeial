
const passport=require("passport")
const express=require("express");
const router=express.Router();
// importing from posts controller
const postsController = require("../controllers/posts_controller")
router.post("/create",passport.checkAuthentication,postsController.create)
router.get("/destroy/:id",passport.checkAuthentication,postsController.destroy)

module.exports = router;