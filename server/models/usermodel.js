import moongose from "mongoose";
import jwt from "jsonwebtoken";
// import signature from "../"

const userSchema = new moongose.Schema({
    image:{
        type:String
    },
    name:{
        type:String,
        require:true    
    },
    email:{
        type:String,
        require:true    
    },
    phone:{
        type:String,
        require:true    
    },
    role:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    cpassword:{
        type:String,
        require:true
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    about:{
        type:String,
    },
    ssi:{
        type:String
    },
    website:{
        type:String
    },
    fb:{
        type:String
    },
    twitter:{
        type:String
    },
    insta:{
        type:String
    },
    linkedin:{
        type:String
    },
    rounds:[{
        type:moongose.Schema.Types.ObjectId,
        ref:"ROUND"
    }],
    pdf:{
        type:String
    },
    verificationToken:{
        type:String,
    },
    isVerified:{
        type:Boolean,
        default:false
    }
}
);
// token generation 
userSchema.methods.generateToken = async function(){
    try{
        const token = jwt.sign({
            _id:this._id.toString(),
            email:this.email,
            isAdmin:this.isAdmin,
        
        },process.env.SIGNATURE,{
            expiresIn:"30d",
        });
        return token;
    }catch(err){
        console.log(err);
    }
}





// creating collection
const User = moongose.model("USER",userSchema);

export default User;