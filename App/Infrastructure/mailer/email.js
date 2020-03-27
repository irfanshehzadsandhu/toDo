const transporter = require("./transporter");

class Email {
 constructor(to,subject,text){
  this.mailOptions = {
    from: "noreply@gmail.com",
    to: to,
    subject: subject,
    text: text
  }
 }
 
 userRegistrationEmail(){
  transporter.sendMail(this.mailOptions, function(error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
 }

};
module.exports = Email;