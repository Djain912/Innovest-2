import Chat from "../models/chatmodel.js";
import User from "../models/usermodel.js";


const accessChat = async (req, res) => {
    try {
        const { userId } = req.body;

        if (!userId) {
            return res.status(400).json({ message: "UserId param not sent with request" });
        }

        let isChat = await Chat.findOne({
            isGroupChat: false,
            users: {
                $all: [req.user._id, userId]
            }
        }).populate("users", "-password -cpassword").populate("latestMessage.sender", "name image email");

        if (isChat) {
            return res.status(200).json(isChat);
        } else {
            const chatData = {
                chatName: "sender",
                isGroupChat: false,
                users: [req.user._id, userId],
            };

            const createdChat = await Chat.create(chatData);
            const FullChat = await Chat.findOne({ _id: createdChat._id }).populate("users", "-password -cpassword");
            return res.status(200).json(FullChat);
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: err.message });
    }
}
const fetchChats = async (req, res) => {
    try{
        Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
        .populate("users", "-password -cpassword")
        .populate("groupAdmin", "-password -cpassword")
        .populate("latestMessage")
        .sort({ updatedAt: -1 })
        .then(async (results) => {
            results = await User.populate(results, {
                path: "latestMessage.sender",
                select: "name image email",
            });
            res.status(200).json(results);
        })
    }catch(err){
        console.error(err);
        return res.status(500).json({ message: err.message });
    }
}

const crtGrpChat = async (req, res) => {
   try{
    if (!req.body.users || !req.body.name) {
        return res.status(400).json({ message: "Please fill all the fields" });
    }

    let users = JSON.parse(req.body.users); 
    if (users.length < 2) {
        return res
            .status(400)
            .json({ message: "More than 2 users are required to form a group chat" });
    }

    users.push(req.user);

    const groupChat= await Chat.create({
        chatName: req.body.name,
        users: users,
        isGroupChat: true,
        groupAdmin: req.user,
    })

    const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
    .populate("users", "-password -cpassword")
    .populate("groupAdmin", "-password -cpassword");
    console.log(fullGroupChat);
    return res.status(200).json(fullGroupChat);
   


   }catch(err){
    console.error(err);
    return res.status(500).json({ message: err.message });
   }

}
const rnmgrp = async (req, res) => {
    try{
        const { chatId, chatName } = req.body;

        const updatedChat = await Chat.findByIdAndUpdate(
            chatId,{
                chatName: chatName
            },
            { new: true }
        )
        .populate("users", "-password -cpassword")
        .populate("groupAdmin", "-password -cpassword");
        return res.status(200).json(updatedChat);
    }catch(err){
        console.error(err);
        return res.status(500).json({ message: err.message });
    }
}

const addtogrp = async (req, res) => {
    try{
        const { chatId, userId } = req.body;
// Check if chatId and userId are provided
if (!chatId || !userId) {
    return res.status(400).json({ message: "chatId and userId are required fields" });
}
        const added = await Chat.findByIdAndUpdate(
            chatId,{
                $push: { users: userId }
            },{
                new: true
            }
        )
        .populate("users", "-password -cpassword")
        .populate("groupAdmin", "-password -cpassword");

        return res.status(200).json(added);
        
    }catch(err){
        console.error(err);
        return res.status(500).json({ message: err.message });
    }
}

const rmfromgrp = async (req, res) => {
    try{
        const { chatId, userId } = req.body;

        const removed = await Chat.findByIdAndUpdate(
            chatId,{
                $pull: { users: userId }
            },{
                new: true
            }
        )
        .populate("users", "-password -cpassword")
        .populate("groupAdmin", "-password -cpassword");

        return res.status(200).json(removed);
    }catch(err){
        console.error(err);
        return res.status(500).json({ message: err.message });
    }
}

export  {accessChat,fetchChats,crtGrpChat,rnmgrp,addtogrp,rmfromgrp};

// const accessChat = async (req, res) => {
//    try{
//     const { userId } = req.body;

//     if (!userId) {
//         return res.sendStatus(400).json({ message: "UserId param not sent with request" });
//     }

//     let isChat = await Chat.find({
//         isGroupChat: false,
//         $and: [
//             { users: { $elemMatch: { $eq: req.user._id } } },
//             { users: { $elemMatch: { $eq: userId } } },
//         ]
//     }).populate("users", "-password,-cpassword").populate("latestMessage");

//     isChat = await User.populate(isChat, {
//         path: "latestMessage.sender",
//         select: "name image email",
//     })

//     if (isChat.length > 0) {
//         res.send(isChat[0]);
//     }
//     else {
//         var chatData = {
//             chatName: "sender",
//             isGroupChat: false,
//             users: [req.user._id, userId],
//         };
//     }

//     const createdChat = await Chat.create(chatData);
//     const FullChat = await Chat.findOne({ _id: createdChat._id }).populate(
//         "users","-password,-cpassword"
//     )
//     return res.status(200).json(FullChat);
//    }catch(err){
//     res.status(500).json({ message: err.message });
//     console.log(err);
//    }
// }

// export default accessChat;