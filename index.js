const express =  require("express");
const app=express();
const cookieParser=require("cookie-parser")

const port=8000;
const expressLayouts=require("express-ejs-layouts")

//importing mongoose modules
const db=require("./config/mongoose")

//used for sessio0n cookie
const session = require("express-session")

const passport =  require("passport")

const passportLocal =  require("./config/passport-local-stratergy")
// const MongoStore=require("connect-mongo")(session)
const MongoStore=require("connect-mongo")
const url="mongodb://localhost/codeial_development";


//reading through posts requests
app.use(express.urlencoded());

// when the req comes cookie needs to be parsed in middleware
app.use(cookieParser());



// we put assets folder inside
app.use(express.static("./assets"));



// we used below statement before routers its mandatory
app.use(expressLayouts);


//extract style and scripts from sub pages
app.set("layout extractStyles",true);
app.set("layout extractScripts",true);


// 1st the req comes to index.js and when any other req coming after localhost the above route is used

// set up the view engine
app.set("view engine","ejs");
app.set("views","./views");

// middle ware that takes session cookie and encrypts it
//mongo store is used to store the session cookie in the db
app.use(session({
   name:"codeial" ,
   //change the secret before deployement
   secret:"blasomething",
   //if the user is not signed in we arent saving additional data
   resave:false,
   cookie:{
       maxAge:(1000*60*100)
   },
//    store:new MongoStore(
//        {
       
//            mongooseConnection:db,
//            autoRemove:"disabled"
       
//       },
      store:new MongoStore(
        {
            mongoUrl:url,
            autoRemove:"disabled",
       },
      // if connection is not established
      function(err){
          console.log(err || "connect-mongodb setup ok")
      }

    )

}))

app.use(passport.initialize());
app.use(passport.session());

//this function checks wheather session ncookie pressent or not
app.use(passport.setAuthenticatedUser);


// use express router
app.use("/",require("./routes"));


app.listen(port,function(err){

    if(err){
        //console.log("error",err);
        console.log(`Error in running server :${err}`);
    }
    console.log(`Server running on port:${port}`);
})