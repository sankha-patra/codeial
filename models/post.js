const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const AVATAR_PATH= path.join("/uploads/post/avatars")


const postSchema =new mongoose.Schema({
    content:{
        type:String,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    // include the array of ids of all comments in this post schema itself
    comments:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Comment"
        }
    ],
    likes:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Like"

        }

    ],
    avatar:{
        type:String
    }
},{
    timestamps:true


});
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname,"..",AVATAR_PATH));
    },
    filename: function (req, file, cb) {
    //   const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + Date.now());
    }
  });
  // static methods
  //for uplaoding only 1 file
  postSchema.statics.uploadedAvatar =  multer({storage:storage}).single("avatar")

  postSchema.statics.avatarPath = AVATAR_PATH;










const Post = mongoose.model("Post",postSchema);
module.exports = Post;
//whenever we are loading a post we need to find all the comment inside that post