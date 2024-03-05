import User from "../models/usermodel.js";
import Post from "../models/postmodel.js";
import Product from "../models/productmodel.js";

const showprofile = async (req, res) => {
    try {
        const userData = await User.findById(req.params.id).select({ password: 0, cpassword: 0});
        if (!userData) {
            return res.status(404).json({ message: "User not found" });
        }
        
        const postData = await Post.find({ username: req.params.id });
        const products = await Product.find({ productof: req.params.id });
        
        // Combine user data and post data into a single object
        const profileData = {
            user: userData,
            posts: postData,
            products: products
        };

        return res.status(200).json(profileData);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
}

export default showprofile;
