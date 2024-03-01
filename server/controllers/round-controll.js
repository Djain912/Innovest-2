import mongoose from "mongoose";
import Round from "../models/roundmodel.js";

const addRound = async (req, res) => {
    try {
        // Find the round by its ID
        const existingRound = await Round.findById(req.body.id);
    
        if (existingRound) {
            // If the round exists, update its fields
            existingRound.title = req.body.title;
            existingRound.description = req.body.description;
            existingRound.value = req.body.value;
            
            // Save the updated round
            const updatedRound = await existingRound.save();
            res.status(200).json(updatedRound);
        } else {
            // If the round doesn't exist, create a new round
            const newRound = await Round.create({
                title: req.body.title,
                roundBy: req.user._id,
                description: req.body.description,
                value: req.body.value
            });
            res.status(200).json(newRound);
        }
    } catch (err) {
        res.status(422).json({ error: err.message });
    }
    
}
const getRound = async (req, res) => {
    try {
        const rounds = await Round.find({roundBy:req.user._id});
        res.status(200).json(rounds);
    } catch (err) {
        res.status(422).json({ error: err.message });
    }
}

const profilegetround = async (req, res) => {
    try {
        // Query the database to find investment rounds by user ID
        const rounds = await Round.find({ roundBy: req.params.userId });
    
        res.json(rounds); // Send investment rounds data as JSON response
      } catch (err) {
        console.error('Error fetching rounds:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      }
}
export  {getRound,addRound,profilegetround };    