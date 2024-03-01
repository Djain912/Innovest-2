import { text } from "express";
import Post from "../models/postmodel.js";

const createpost = async (req, res) => {
    try {
        const { post, postimg, type } = req.body; // Include the type of post
        if (!post  || !type) { // Check if type is provided
            return res.status(400).json({ message: "All Fields are required" });
        }
        req.user;
        const p = await Post.create({ description: post, photo: postimg, username: req.user, type }); // Save the type
        res.status(200).json({ message: "Post created successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}


/////////////////////////////////////////////////////////////////
const getpost = async (req, res) => {
    try{
        Post.find()
        .populate("username","_id name image")
        .then((data) => {
            res.status(200).json(data)
        }).catch((err) => {
            res.status(500).json({ message: err.message })
        })
    }catch(err){
        res.status(500).json({ message: err.message })
    }
}

/////////////////////////////////////////////////////////////////
const likepost = async (req, res) => {
    try {
        // Check if the user's ID is already present in the likes array
        const post = await Post.findById(req.body.postId);
        // if (post.likes.includes(req.user._id)) {
        //     return res.status(422).json({ error: "User already liked this post" });
        // }

        // If the user's ID is not present, update the likes array
        const like = await Post.findByIdAndUpdate(req.body.postId, {
            $push: { likes: req.user._id }
        }, { new: true }).exec();
        
        res.status(200).json(like);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const unlikepost = async (req, res) => {
    try {
        const unlike = await Post.findByIdAndUpdate(req.body.postId, {
            $pull: { likes: req.user._id }
        }, { new: true }).exec();
        res.status(200).json(unlike);
    } catch (err) {
        res.status(422).json({ error: err.message });
    }
};

const comments = async (req, res) => {
    try {
        const comment = await Post.findByIdAndUpdate(req.body.postId, {
            $push: { comments: { comment: req.body.text, user: req.user._id } }
        }, { new: true }).exec();
        res.status(200).json(comment);
    } catch (err) {
        res.status(422).json({ error: err.message });
    }
}

const myposts = async (req, res) => {
    const { username } = req.body;
    try {
        const myposts = await Post.find({ username: username });
        res.status(200).json(myposts);
    } catch (err) {
        res.status(422).json({ error: err.message });
    }
};

const delpost = async (req, res) => {
    try {
        const delpost = await Post.findByIdAndDelete(req.body.postid);
        res.status(200).json(delpost);
    }catch(err){
        res.status(422).json({ error: err.message });
    }
}



export {createpost,getpost,likepost,unlikepost,comments,myposts,delpost} ;