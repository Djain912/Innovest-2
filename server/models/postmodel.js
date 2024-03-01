import mongoose from 'mongoose';
// import {ObjectId} from mongoose.Schema.Types;

const postSchema = new mongoose.Schema({
    photo:{
        type:String,
        require:true
    },
    description:{
        type:String,
        require:true
    },

    username:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"USER"
    },
    likes:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"USER"
    }],
    type:{
        type:String,
        require:true
    },
    comments:[{
        comment:{
            type:String,
        },
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"USER"
        },
      
    }]
},
{timestamps:true}
)

const Post = mongoose.model("POST",postSchema);

export default Post;