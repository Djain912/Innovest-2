import User from "../models/usermodel.js";


const allUsers = async (req, res) => {
    try {
        const data = req.query.search ? { name: { $regex: req.query.search, $options: "i" } } : {};

        const users = await User.find(data).find({ _id: { $ne: req.user._id } }, "-password -cpassword").select({ password: 0, cpassword: 0 });
        return res.status(200).json(users);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};


export default allUsers;