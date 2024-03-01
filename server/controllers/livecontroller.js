import Live from "../models/livemodel.js";

const LiveFunc = async (req, res) => {

    try {
        const {id,desc,link} = req.body
        if(!id || !desc){
            return res.status(400).json({ message: "title and description are required" });
        }
        const live = await Live.create({roomno:id,desc,link})
        res.status(200).json(live);
    } catch (err) {
        res.status(422).json({ error: err.message });
    }
}
const RoomFunc = async (req, res) => {

    try {
        const {id,link} = req.body
        if(!id || !link){
            return res.status(400).json({ message: "title and description are required" });
        }
        const live = await Live.findOneAndUpdate(
            { roomno: id }, // Filter condition: find row by roomno
            { $set: { link: link, isLive: true } }, // Update: set link and update isLive to true
            { new: true } // Options: return the updated document
        );
        
        res.status(200).json(live);
    } catch (err) {
        res.status(422).json({ error: err.message });
    }
}

const LiveList = async (req, res) => {

    try {
        const live = await Live.find({isLive:true});
        res.status(200).json(live);
    } catch (err) {
        res.status(422).json({ error: err.message });
    }
}
export  {LiveFunc,RoomFunc,LiveList};