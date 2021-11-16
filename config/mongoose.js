const mongoose=require("mongoose");
mongoose.connect("mongodb://localhost/codeial_development")
const db=mongoose.connection;


// whenever there is an error in connecting to the dataabase
db.on("error",console.error.bind(console,"Error connecting to mongo db"));

// when we get connected to the database
db.once("open",function(){
    console.log("Connected to the database ::MongoDb")
});

// to use this module we export it to index.js
module.exports=db;
