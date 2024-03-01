import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    image:{
        type:String,
        require:true
    },
    type:{
        type:String,
        require:true
    },
    productof:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"USER"
    },
    description:{
        type:String,
        require:true
    },
    link:{
        type:String,
        require:true
    }
})

const Product = mongoose.model("PRODUCT",productSchema);

export default Product;