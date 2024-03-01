import nodemailer from 'nodemailer';

const emailverify = async (email,subject,text) => {
 try{

    const transporter = nodemailer.createTransport({
        host : "smtp.gmail.com",
        service : "gmail",
        port : 587,
        secure : true,
        auth : {
            user : "your-email",
            pass : "your-password"
        }
     
    })
    await transporter.sendMail({
        from : "your-email",
        to : email,
        subject : subject,
        text : text

    })

    console.log("Email sent successfully");

 }catch(error){
     console.log(error);
 }
}

export default emailverify;