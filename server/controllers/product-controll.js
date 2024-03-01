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

export {addproduct,getproduct,prdetail};