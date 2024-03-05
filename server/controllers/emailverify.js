import nodemailer from 'nodemailer';

const emailverify = async (email,subject,text) => {
 try{

    const transporter = nodemailer.createTransport({
        host : "smtp.gmail.com",
        service : "gmail",
        port : 587,
        secure : true,
        auth : {
            user : "djain93260@gmail.com",
            pass : "lfyz krdm pvpj idyt"
        }
     
    })
    await transporter.sendMail({
        from : "djain93260@gmail.com",
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