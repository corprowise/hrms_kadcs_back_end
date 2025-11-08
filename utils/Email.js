const nodemailer = require('nodemailer');
const config = require('../config');



module.exports = {
    async sendEmailGmail(
      emailId,
      template,
      subject,
      cc = null,
      attachments = []
    ) {
      try {
        // console.log(config.USER_EMAIL,config.USER_PASSWORD);
        const transporter = nodemailer.createTransport({
          host: "email-smtp.ca-central-1.amazonaws.com",
          port: 587,
          secure: false,
          auth: {
            user: config.email.auth.user,
            pass: config.email.auth.pass,
          },
        });

        // return { status: false };
        
        let mailOptions = {
          from: config.email.from,
          to: emailId,
          subject: subject,
          html: template,
        };
        if (cc) {
          mailOptions.cc = cc;
        }
        if (attachments.length > 0) {
          mailOptions.attachments = attachments;
        }
        await transporter.sendMail(mailOptions);
        return { status: true };
      } catch (error) {
        console.error("Error sending email:", error);
        return { status: false };
      }
    },
}