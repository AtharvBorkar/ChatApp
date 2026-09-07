import mongoose, {Document, Schema, Types} from 'mongoose';

export interface IMessage extends Document{
    chatId: Types.ObjectId
    sender: string
    text: string
    
    image?: {
        url: string
        publicId: string
    }
    messageType: "text" | "image"
    seen: boolean
    seenAt?: Date
    createdAt: Date
    updatedAt: Date
}
