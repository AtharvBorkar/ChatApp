import mongooge, { Document } from 'mongoose';
export interface IChat extends Document {
    users: string[];
    latestMessage: {
        text: string;
        sender: string;
    };
    createdAt: Date;
    updatedAt: Date;
}
export declare const Chat: mongooge.Model<IChat, {}, {}, {}, Document<unknown, {}, IChat, {}, mongooge.DefaultSchemaOptions> & IChat & Required<{
    _id: mongooge.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, IChat>;
//# sourceMappingURL=Chat.d.ts.map