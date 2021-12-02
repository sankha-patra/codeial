const mongoose = require("mongoose");

const likeSchema = new mongoose.Schema({

       //this defines the object id of the liked object
    user:{
        type:mongoose.Schema.ObjectId
        
    },

       //this field is used for defiening the type of liked object since it is a dynamic pathde

 
    likeable:{
        type:mongoose.Schema.ObjectId,
        require:true,
        enum:["Post","Comment"]
    }

},{
    timestamps:true
})

const Like = mongoose.model("Like",likeSchema);
module.exports = Like;