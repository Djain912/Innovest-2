import mongoose from "mongoose";

const liveSchema = new mongoose.Schema({
    roomno:{
        type:String,
        require:true
    },
    desc:{
        type:String,
        require:true
    },
    isLive:{
        type:Boolean,
        default:false,
        require:true
    },
    link:{
        type:String,
        require:true
    }
})

const Live = mongoose.model("LIVE",liveSchema);

export default Live;