import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    sender:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"USER"
    },
    content:{
        type:String,
        trim:true
    },
    chat:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"CHAT"
    }
},
  {timestamps:true});

const Message = mongoose.model("MESSAGE",messageSchema);
export default Message;