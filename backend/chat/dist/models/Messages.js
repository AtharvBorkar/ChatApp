import { Schema } from 'mongoose';
const schem = new Schema({
    chatId: {
        type: Schema.Types.ObjectId,
        ref: "Chat",
        required: true
    },
    sender: {
        type: String,
        required: true
    },
    text: String,
    image: {
        url: String,
        publicId: String
    },
    messageType: {
        type: String,
        enum: ["text", "image"],
        default: "text"
    },
    seen: {
        type: Boolean,
        default: false
    },
    seenAt: {
        type: Date,
        default: null
    }
});
//# sourceMappingURL=Messages.js.map