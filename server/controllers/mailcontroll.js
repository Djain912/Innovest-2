// backend/mail.js
import nodemailer from "nodemailer";

const sendMail = async (req, res) => {
    const { name, email,address, city, state, zip, phone, message, product } = req.body;

    if (!name || !email|| !address || !city || !state || !zip || !phone || !message || !product) {
        return res.status(400).json({ message: "Please fill all the fields" });
    }
    // Create a transporter using nodemailer
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "djain93260@gmail.com", // Your email address
            pass: "lfyz krdm pvpj idyt", // Your email password
        },
    });

    try {
        // Send mail with defined transport object
        await transporter.sendMail({
            from: "your-email@gmail.com",
            to: email,
            subject: "Product Testing Mail",
            html: `
            <h2>Product Testing</h2>
            <h2>Product Details</h2>
            <p><strong>Name:</strong> ${product.name}</p>
            <p><strong>Description:</strong> ${product.description}</p>
            <img style="width: 300px; height: 300px;" src="${product.image}" alt="Product Image">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Address:</strong> ${address}</p>
            <p><strong>City:</strong> ${city}</p>
            <p><strong>State:</strong> ${state}</p>
            <p><strong>Zip:</strong> ${zip}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Message:</strong> ${message}</p>
            
        `,
            
        });

        res.status(200).json({ message: "Email sent successfully" });
    } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).json({ error: "Error sending email" });
    }
};

const cmail = async (req, res) => {
    const { name, email,skill, address, city, state, zip, phone, message,file } = req.body;

    
    // Your validation code remains the same
    if (!name || !email|| !skill ||!address || !city || !state || !zip || !phone || !message ) {
        return res.status(400).json({ message: "Please fill all the fields" });
    }
    // Create a transporter using nodemailer
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "djain93260@gmail.com", // Your email address
            pass: "lfyz krdm pvpj idyt", // Your email password
        },
    });

    try {
        // Send mail with defined transport object
        await transporter.sendMail({
            from: "your-email@gmail.com",
            to: email,
            subject: "Colaboration Mail",
            html: `
            <h2>Collaboration</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Skills:</strong> ${skill}</p>
            <p><strong>Address:</strong> ${address}</p>
            <p><strong>City:</strong> ${city}</p>
            <p><strong>State:</strong> ${state}</p>
            <p><strong>Zip:</strong> ${zip}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Message:</strong> ${message}</p>
            <p><strong>File:</strong> <a href="${file}">File</a>
            `,
        
        });

        res.status(200).json({ message: "Email sent successfully" });
    } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).json({ error: "Error sending email"+error });
    }
}

export  {sendMail,cmail};
