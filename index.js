

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



const passportJWT =  require("./config/passport-jwt-stratergy")
const passportGoogle = require("./config/passport-google-oauth2-strategy")


// const MongoStore=require("connect-mongo")(session)
const MongoStore=require("connect-mongo")
const url="mongodb://localhost/codeial_development";
const sassMiddleware = require("node-sass-middleware")

const flash = require("connect-flash");
 
const { setFlash } = require("./config/middleware");

const customMware = require("./config/middleware")


//setup chat server to be used with socket.io
const chatServer = require('http').Server(app);
const chatSockets = require('./config/chat_sockets').chatSockets(chatServer);
chatServer.listen(5000);
console.log('chat server is listening on port 5000');
app.use(sassMiddleware({
    src:"./assets/scss",
    dest:"./assets/css",
    debug:true,
    outputStyle:"extended",
    prefix:"/css"
}));
//reading through posts requests
app.use(express.urlencoded({ extended: false }));

// app.use(express.urlencoded());

// when the req comes cookie needs to be parsed in middleware
app.use(cookieParser());



// we put assets folder inside
app.use(express.static("./assets"));


//make the uploads path availbale to browser

app.use("/uploads",express.static(__dirname + "/uploads"))



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
//flash uses session cookies so put it after that
app.use(flash());


app.use(customMware.setFlash);

// use express router
app.use("/",require("./routes"));
app.use(customMware,setFlash)

app.listen(port,function(err){

    if(err){
        //console.log("error",err);
        console.log(`Error in running server :${err}`);
    }
    console.log(`Server running on port:${port}`);
})