import User from "../models/usermodel.js";
import Contact from "../models/contactschema.js";
import bcryptjs from "bcryptjs";
import axios from "axios";



const home = async (req, res) => {
    try {
        res.status(200).send("Hello World! from  controller home");
    } catch (err) {
        console.log(err);
    }
}
const signup = async (req, res) => {
    try {
        const { name, email, phone,role, password, cpassword } = req.body;

        if (!name || !email || !phone || !role || !password || !cpassword) {
            return res.status(400).json({ message: "Please fill all the fields" });
        }

        const userExist = await User.findOne({ email: email });

        if (userExist) {
            return res.status(400).json({ message: "user is existing" })
        }
        const phonecheck = /^[0-9]{10}$/; 
        const phonecheck2 = /^\+\d{12}$/;
        if (phonecheck.test(phone) === false && phonecheck2.test(phone) === false) {
            return res.status(400).json({ message: "Enter Valid Phone Number" });
        }
        if(role === ""){
            return res.status(400).json({ message: "Please Select the Role" });
        }
        // pass hashing 
        let hashpass;

        if (password !== cpassword) {
            return res.status(400).json({ message: "Password does not match" });
        } else {
            hashpass = await bcryptjs.hash(password, 10);
        }



        const usercreated = await User.create({ name, email, phone,role, password: hashpass, cpassword: hashpass });
        return res.status(200).json({
            message: "Registration Successful",
            token: await usercreated.generateToken(),
            _id: usercreated._id.toString(),

        });

    } catch (err) {

        console.log(err);
    }
}

//LOGIN
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const userExist = await User.findOne({ email: email });

        if (!userExist) {
            res.status(400).json({ message: "user does not exist" });
        }
        const passcheck = await bcryptjs.compare(password, userExist.password);
        if (passcheck) {
            const token = await userExist.generateToken(); // Await here

            res.status(200).json({
                message: "Login Successful",
                token: token,
                _id: userExist._id.toString(),
            });
        } else {
            res.status(400).json({ message: "Password does not match" });
        }
    } catch (err) {
        console.log(err);
    }
}


const contact = async (req, res) => {
    try {
        const { name, email, phone, message } = req.body;
        const contact = await Contact.create({ name, email, phone, message });
        return res.status(200).json({ message: "Contacted Successfully" });
    } catch (err) {
        return res.status(400).json({ message: err.message });
    }
}

const news = async (req, res) => {
    try {
        const response = await axios.get('https://economictimes.indiatimes.com/tech/startups');
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

/// uer logic to send user data to frontend

const user = async (req, res) => {
    try {
        const data = req.user; // req.user will be custome wen will create it in authUserTokenMiddleware.js
        console.log(data);
        res.status(200).json(data);
    }
    catch (error) {
        res.status(500).json({ message: "Error" });
    }
}

const profile = async (req, res) => {
    try {
        const { name, email, phone, role, about, ssi, website, fb, twitter, insta, image } = req.body;
     
        let user = await User.findOne({ email });

        if (!user) {
            // If the user doesn't exist, create a new user
            user = new User({ name, email, phone, role, about, ssi, website, fb, twitter, insta, image });
        } else {
            // If the user exists, update the existing user object
            user.name = name || user.name;
            user.phone = phone || user.phone;
            user.about = about || user.about;
            user.ssi = ssi || user.ssi;
            user.website = website || user.website;
            user.fb = fb || user.fb;
            user.twitter = twitter || user.twitter;
            user.insta = insta || user.insta;
            user.image = image || user.image;
        }

        // Save the updated user object
        const updatedUser = await user.save();
        // Respond with a success message
        return res.status(200).json({ message: "Profile updated successfully", user: updatedUser });
    } catch (err) {
        console.error("Error updating profile:", err);
        return res.status(500).json({ message: "Internal server error" });
    }
}; 


const delpimg = async (req, res) => {
    try {
        const { email } = req.body;
        const profile = await User.updateOne({ email }, { image: "" }).exec();
        return res.status(200).json({ message: profile });
    } catch (err) {
        console.error("Error updating profile:", err);
        return res.status(500).json({ message: "Internal server error" });
    }
}
const pdf = async (req, res) => {
    try {
        const { email, pdf: pdfUrl } = req.body; // Extract pdf URL from req.body
        const profile = await User.findOneAndUpdate(
            { email },
            { pdf: pdfUrl }, // Pass pdf URL directly to update operation
            { new: true }
        );
        
        // Using findOneAndUpdate to update the user's profile with the PDF URL
        // Set { new: true } to return the updated document after the update operation
        return res.status(200).json({ message: "PDF URL updated successfully", profile });
    } catch (err) {
        console.error("Error updating PDF URL:", err);
        return res.status(500).json({ message: "Internal server error" });
    }
}

const delpdf = async (req, res) => {
    try {
        const { email } = req.body;
        const profile = await User.updateOne({ email }, { pdf: "" }).exec();
        return res.status(200).json({ message: profile });
    } catch (err) {
        console.error("Error updating profile:", err);
    }
    
}
export { home, signup, login, contact, news, user, profile,delpimg,pdf,delpdf };