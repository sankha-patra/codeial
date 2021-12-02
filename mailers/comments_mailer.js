// const nodemailer = require("../config/nodemailer");
// const nodeMailer = require("../config/nodemailer");


// // instead of module.exports  =  newcomment
// // we use
// exports.newComment=(comment)=>{
//     console.log("inside newComment mailer");


//     nodemailer.transporter.sendMail({
//         from:"sankha@gmail.com",
//         to:comment.user.email,
//         subject:"new comment published",
//         html:"<h1>Your comment is now publish</h1>"
//     },(err,info)=>{
//         if(err){
//             console.log("Error in sending mail",err)
//             return;
//         }
//         console.log("message sent",info);
//         return;
//     })

// }








// const nodeMailer = require('../config/nodemailer');


// // this is another way of exporting a method
// exports.newComment = (comment) => {
//     console.log('inside newComment mailer', comment);

//     nodeMailer.transporter.sendMail({
//        from: 'sankha2312@gmail.com',
//        to: comment.user.email,
//        subject: "New Comment Published!",
//        html: '<h1>Yup, your comment is now published!</h1>' 
//     }, (err, info) => {
//         if (err){
//             console.log('Error in sending mail', err);
//             return;
//         }

//         console.log('Message sent', info);
//         return;
//     });
// }


const nodeMailer = require('../config/nodemailer');


// // this is another way of exporting a method
// exports.newComment = (comment) => {
//     console.log('inside newComment mailer', comment);

//     let htmlString = nodeMailer.renderTemplate({comment: comment},"/comments/new_comment.ejs")




//     nodeMailer.transporter.sendMail({
//        from: 'sankha2312@gmail.com',
//        to: comment.user.email,
//        subject: "New Comment Published!",
//        html: htmlString 
//     }, (err, info) => {
//         if (err){
//             console.log('Error in sending mail', err);
//             return;
//         }

//         console.log('Message sent', info);
//         return;
//     });
// }








// exports.newComment = (comment) => {
//     let htmlString = nodeMailer.renderTemplate({comment: comment}, '/comments/new_comment.ejs');

//     nodeMailer.transporter.sendMail({
//        from: 'sankha2312@gmail.com',
//        to: comment.user.email,
//        subject: "New Comment Published!",
//     //    html: htmlString
//     html:"hello"
//     }, (err, info) => {
//         if (err){
//             console.log('Error in sending mail', err);
//             return;
//         }

//         console.log('Message sent', info);
//         return;
//     });
// }












exports.newComment = (comment) => {
    console.log("Comment: ", comment);
    let htmlString = nodeMailer.renderTemplate({
        comment: comment
    }, '/comments/new_comment.ejs')
    nodeMailer.transporter.sendMail({
        from: 'sankha2312@gmail.com',
        to: comment.user.email,
        // subject: 'Your Comment has been successfully published!!!',
        subject: `${comment.user.name} your commented got posted`,
        // html: htmlString
        html:`<div style="background-color:yellow; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;">
        <h1 style="color: lightseagreen;">Hi ${comment.user.name }</h1> 
        <br>
        <br>
        <h1 style="color: blue;">Your comment "<strong style="color: lightseagreen;" >${comment.content}</strong>" just got published</h1>
        <br>
        <br>
        <h1>keep commenting on posts!!!!</h1>
        </div>
         
         `
    }, (err, info) => {
        if(err){
            console.log("$$$$$$$$$$$$$$$$$",err);
            return;
        }
        // console.log("Message successfully sent", info);
        console.log("Message successfully sent",info);
        return;
    })
};

exports.newCommentPost = (comment, post) => {
    console.log("Comment: ", comment);
    console.log("Post: ", post);
    let htmlString = nodeMailer.renderTemplate({
        comment: comment
    }, '/comments/new_commentPost.ejs')
    nodeMailer.transporter.sendMail({
        from: 'sankha2312@gmail.com',
        to: post.user.email,
        subject: `${comment.user.name} commented on your post`,
        html: `<div style="background-color:yellow; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;">
        <h1 style="color: lightseagreen;">Hi ${post.user.name }</h1> 
        <br>
        <br>
        <h1 style="color: blue;">${comment.user.name} commented "<strong style="color: lightseagreen;" >${comment.content}</strong>" on your post</h1>
        <br>
        <br>
        <h1>Thank you!!!!</h1>
        </div>
         
         `
    }, (err, info) => {
        if(err){
            console.log(" @@@@@@@@@@@@@@@@@@@@@@@%%%%%%%%%%%%%%%%",err);
            return;
        }
        // console.log("Message successfully sent", info);
        console.log("Message successfully sent");
        return;
    })
};









