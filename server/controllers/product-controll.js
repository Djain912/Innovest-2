import User from "../models/usermodel.js";
import Product from "../models/productmodel.js";


const addproduct = async (req, res) => {
    try{
        if(!req.body.name || !req.body.image || !req.body.type || !req.body.description ){
            return res.status(400).json({message: "Please fill all the fields"});
        }
        const product = await Product.create(req.body);
        return res.status(200).json(product);

    }catch(err){
        console.log(err);
    }
} 

const getproduct = async (req, res) => {
    try{
        const product = await Product.find();
        return res.status(200).json(product);
    }catch(err){
        console.log(err);
    }
}

const prdetail = async (req, res) => {
    try{
        const product = await Product.findById(req.params.id);
        return res.status(200).json(product);
    }catch(err){
        console.log(err);
    }
}

const myproduct = async (req, res) => {
   const user = req.params.id;
    try {
        const myposts = await Product.find({ productof: user });
        res.status(200).json(myposts);
    } catch (err) {
        res.status(422).json({ error: err.message });
    }
};

const delproduct = async (req, res) => {
    try {
        const delpost = await Product.findByIdAndDelete(req.body.id);
        res.status(200).json(delpost);
    }catch(err){
        res.status(422).json({ error: err.message });
    }
}

export {addproduct,getproduct,prdetail,myproduct,delproduct};