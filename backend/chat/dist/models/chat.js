import mongooge, { Document, Schema } from 'mongoose';
const schema = new Schema({
    users: [{ type: String, required: true }],
    latestMessage: {
        text: String,
        sender: String,
    }
}, {
    timestamps: true,
});
//# sourceMappingURL=chat.js.map