import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
    chatName:{
        type:String,
        trim:true
    },
    isGroupChat:{
        type:Boolean,
        default:false
    },
    users:[{
       type:mongoose.Schema.Types.ObjectId,
       ref:"USER" 
}],
    latestMessage:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"MESSAGE"
    },
    groupAdmin:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"USER"
    }

},
{timestamps:true});

const Chat = mongoose.model("CHAT",chatSchema);

export default Chat;