// to controll many users

module.exports.profile=function(req,res){
  return res.render("profile",{
      title:"profile"
  })
  
}



// now this controller is ready to get accessed by a router
// that route needs to get accessed by browser
// browser tells in which route we need to go and controller returns the data it has
// every time we ceate a controller we create a route so that we can access it through route