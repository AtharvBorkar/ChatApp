import { Document, Types } from 'mongoose';
export interface IMessage extends Document {
    chatId: Types.ObjectId;
    sender: string;
    text: string;
    image?: {
        url: string;
        publicId: string;
    };
}
//# sourceMappingURL=Messages.d.ts.map