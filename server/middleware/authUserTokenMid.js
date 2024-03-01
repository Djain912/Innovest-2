import jwt from "jsonwebtoken";
import User from "../models/usermodel.js";
const authUserTokenMid = async (req, res, next) => {
    const token = req.header("Authorization");

    if(!token){
        res.status(401).send("User Must Login First");
    }
    const jwtToken = (token && token.startsWith("Bearer")) ? token.slice(7).trim() : null;


    try{
        const isVerrified = jwt.verify(jwtToken, process.env.SIGNATURE);
        // console.log(isVerrified);
        const userData = await User.findOne({email:isVerrified.email}).
        select({
            password:0,
            cpassword:0
        })


        req.user = userData;
        req.token = token;
        req.id = userData._id;
        next();
    }
    catch(err){
        res.status(401).send("unauthorized");
    }
}

export default authUserTokenMid;