import mongoose from "mongoose";

// const URI = "mongodb+srv://djain:djain912@cluster0.2pco42p.mongodb.net/"

const URI = "mongodb+srv://djain:djain912@cluster0.2pco42p.mongodb.net/admin1?retryWrites=true&w=majority";
const connectdb = async()=>{
    try{
        const conn = await mongoose.connect(URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    }catch(err){
        console.log(err);
        process.exit(0);
    }
}

export default connectdb;