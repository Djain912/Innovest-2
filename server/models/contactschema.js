import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
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
    message:{
        type:String,
        require:true
    }
});

const Contact = mongoose.model("CONTACT",contactSchema);
export default Contact;