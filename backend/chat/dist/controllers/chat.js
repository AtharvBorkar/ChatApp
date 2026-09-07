import axios from "axios";
import TryCatch from "../config/TryCatch.js";
// import { Chat } from "../models/Chat.js";
import { Chat } from "../models/chat.js";
import { Messages } from "../models/Messages.js";
export const creatNewChat = TryCatch(async (req, res) => {
    const userId = req.user?._id;
    const { otherUserId } = req.body;
    if (!otherUserId) {
        res.status(400).json({
            message: "Other userid is required"
        });
        return;
    }
    const existingChat = await Chat.findOne({
        users: { $all: [userId, otherUserId], $size: 2 }
    });
    if (existingChat) {
        res.json({
            message: "Chat already exists",
            chatId: existingChat._id,
        });
        return;
    }
    const newChat = await Chat.create({
        users: [userId, otherUserId]
    });
    res.status(201).json({
        message: "New Chat created",
        chatId: newChat._id,
    });
});
export const getAllChats = TryCatch(async (req, res) => {
    const userId = req.user?._id;
    if (!userId) {
        res.status(400).json({
            message: "UserId missing"
        });
        return;
    }
    const chats = await Chat.find({ users: userId }).sort({ updatedAt: -1 });
    const chatWithUserData = await Promise.all(chats.map(async (chat) => {
        const otherUserId = chat.users.find(id => id !== userId);
        const unseenCount = await Messages.countDocuments({
            chatId: chat._id,
            sender: { $ne: userId },
            seen: false
        });
        try {
            const { data } = await axios.get(`${process.env.USER_SERVICE}/api/v1/user/${otherUserId}`);
            return {
                user: data,
                chat: {
                    ...chat.toObject(),
                    latestMessage: chat.latestMessage || null,
                    unseenCount,
                }
            };
        }
        catch (error) {
            console.error(`Error fetching user data for userId: ${otherUserId}`, error);
            return {
                user: { _id: otherUserId, name: "Unknown User" },
                chat: {
                    ...chat.toObject(),
                    latestMessage: chat.latestMessage || null,
                    unseenCount,
                }
            };
        }
    }));
    res.json({
        chats: chatWithUserData,
    });
});
export const sendMessage = TryCatch(async (req, res) => {
    const senderId = req.user?._id;
    const { chatId, text } = req.body;
    const imageFile = req.file;
    if (!senderId) {
        res.status(401).json({
            message: "unauthorized"
        });
        return;
    }
    if (!chatId) {
        res.status(400).json({
            message: "Chatid is required"
        });
        return;
    }
    if (!text && !imageFile) {
        res.status(400).json({
            message: "Either text or image is required"
        });
        return;
    }
    const chat = await Chat.findById(chatId);
    if (!chat) {
        res.status(404).json({
            message: "Chat not found"
        });
        return;
    }
    const isUserInChat = chat.users.some((userId) => userId.toString() === senderId.toString());
    if (!isUserInChat) {
        res.status(403).json({
            message: "You are not participant of this chat"
        });
        return;
    }
    const otherUserId = chat.users.find((userId) => userId.toString() !== senderId.toString());
    if (!otherUserId) {
        res.status(401).json({
            message: "No otherr User"
        });
        return;
    }
    //socket setup
    let messageData = {
        chatId: chatId,
        sender: senderId,
        seen: false,
        seenAt: undefined,
    };
    if (imageFile) {
        messageData.image = {
            url: imageFile.path,
            publicId: imageFile.filename,
        };
    }
});
//# sourceMappingURL=chat.js.map