const nodeMailer = require('nodemailer')

const sendEmail = async options =>{

     const transport = {
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth:{
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
};

const transporter = nodeMailer.createTransport(transport);

const message = {
    from : `${process.env.SMTP_FROM_EMAIL} <${process.env.SMTP_FROM_EMAIL}>`,
    to: options.email,
    subject: options.subject,
    text: options.message
}

 await transporter.sendMail(message)
}

module.exports = sendEmail;