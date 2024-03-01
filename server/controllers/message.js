import Chat from "../models/chatmodel.js";
import Message from "../models/msgmodel.js";
import User from "../models/usermodel.js";

const sendmsg = async (req, res) => {
    try {
        const { content, chatId } = req.body;

        if (!content) {
            return res.status(400).json({ message: "Content is required" });
        }

        let chatExists = true;
        let chat;

        // Check if the chat exists
        if (!chatId) {
            // If chatId is not provided, create a new chat with the selected user
            const { selectedUserId } = req.body; // Assuming selectedUserId is provided in the request body
            if (!selectedUserId) {
                return res.status(400).json({ message: "Selected user is required" });
            }

            // Check if the chat exists between the current user and the selected user
            chat = await Chat.findOne({ users: { $all: [req.user._id, selectedUserId] } });

            if (!chat) {
                // If chat doesn't exist, create a new chat
                chat = await Chat.create({ users: [req.user._id, selectedUserId] });
                chatExists = false; // Set flag to indicate that the chat was newly created
            }
        } else {
            // If chatId is provided, check if the chat exists
            chat = await Chat.findById(chatId);
            if (!chat) {
                return res.status(404).json({ message: "Chat not found" });
            }
        }

        // Create a new message
        const newMessage = {
            sender: req.user._id,
            content: content,
            chat: chat._id
        };

        // Save the message
        let message = await Message.create(newMessage);

        // Populate message with sender and chat details
        message = await message.populate("sender", "name image");
        message = await message.populate("chat");
        message = await User.populate(message, {
            path: "chat.users",
            select: "name image"
        });

        // Update the latestMessage field in the chat only if the chat was not newly created
        if (chatExists) {
            await Chat.findByIdAndUpdate(chat._id, { latestMessage: message });
        }

        return res.status(201).json({ message: "Message sent successfully", data: message });
    } catch (ex) {
        return res.status(500).json({ message: ex.message });
    }
};



const allmsg = async (req, res) => {
    try {
        const loggedInUserId = req.user._id; // Assuming req.user contains the logged-in user's information
        const selectedUserId = req.params.userId; // Assuming you get the selected user's ID from the request parameters

        // Find the chat where both the logged-in user and the selected user are participants
        const chat = await Chat.findOne({
            users: { $all: [loggedInUserId, selectedUserId] }
        });

        if (!chat) {
            // If no chat is found, return an empty array
            return res.json([]);
        }

        // If the chat is found, fetch messages associated with that chat
        const messages = await Chat.find({ chat: chat._id })
            .populate("sender", "name image email")
            .populate("chat");

        return res.json(messages);
    } catch (ex) {
        return res.json({ msg: ex.message });
    }
};


export { sendmsg,allmsg };
