module.exports.setFlash=function(req,res,next){
  //we will find flash from the rq and set it up
   //in the locals of response

   //everything is fetched from req.flash and put to locals
//    to display flash msgs from users controller to htl or ejs  we used middleare
    res.locals.flash={
        "success":req.flash("success"),
        "error":req.flash("error")
    }

    next();
}