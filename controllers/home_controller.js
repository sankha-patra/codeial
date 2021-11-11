


module.exports.home=function(req,res){
    console.log(req.cookies)

    // we edited the cookie
    res.cookie("user_id",25)
    //rendering the view home using ejs
    return res.render("home",{
        title:"Home"
    })
    //return res.end("<h1>Express is up for Codeial!!!</h1>")
}
//module.exports.actionName=function(req,res){}
// using this we can make other controllers wwith different actions using their action name