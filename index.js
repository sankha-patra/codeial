const express =  require("express");
const app=express();
const port=8000;
const expressLayouts=require("express-ejs-layouts")




// we put assets folder inside
app.use(express.static("./assets"));



// we used below statement before routers its mandatory
app.use(expressLayouts);


//extract style and scripts from sub pages
app.set("layout extractStyles",true);
app.set("layout extractScripts",true);

// use express router
app.use("/",require("./routes"));
// 1st the req comes to index.js and when any other req coming after localhost the above route is used

// set up the view engine
app.set("view engine","ejs");
app.set("views","./views");

app.listen(port,function(err){

    if(err){
        //console.log("error",err);
        console.log(`Error in running server :${err}`);
    }
    console.log(`Server running on port:${port}`);
})