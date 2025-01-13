import nodemailer from "nodemailer"
import dotenv from 'dotenv';
dotenv.config();

const transporter = nodemailer.createTransport({
    service: "gmail",
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD
        }
        
})

const sendEmail = async (to:string,subject:string,message:string,html:string)=>{
    try{
        const mailOptions = {
            from :process.env.EMAIL,
            to:to,
            subject:subject,
            text:message,
            html:html
        }

        console.log(process.env.EMAIL,process.env.EMAIL_PASSWORD)
        
        const info = await transporter.sendMail(mailOptions)
        console.log("Email sent: %s", info.messageId)
    }catch(err){
        console.error("Error sending email:", err);
    }
}

export {sendEmail}