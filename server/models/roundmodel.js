import mongoose from "mongoose";

const roundSchema = new mongoose.Schema({

    title:{
        type:String,
        require:true
    },
    roundBy:{
    type:mongoose.Schema.Types.ObjectId,
       ref:"USER"
    },
    description:{
        type:String,
        require:true
    },
    value:{
        type:Number,
        require:true
    }
})

const Round = mongoose.model("ROUND",roundSchema);

export default Round;