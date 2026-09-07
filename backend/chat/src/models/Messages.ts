import mongoose, {Document, Schema, Types} from 'mongoose';

export interface IMessage extends Document{
    chatId: Types.ObjectId
    sender: string
    text: string
    // createdAt: Date
    // updatedAt: Date
    image?: {
        url: string
        publicId: string
    }
}