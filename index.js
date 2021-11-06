const express =  require("express");
const app=express();
const port=8000;
// use express router
app.use("/",require("./routes"));
// 1st the req comes to index.js and when any other req coming after localhost the above route is used
app.listen(port,function(err){
    if(err){
        //console.log("error",err);
        console.log(`Error in running server :${err}`);
    }
    console.log(`Server running on port:${port}`);
})