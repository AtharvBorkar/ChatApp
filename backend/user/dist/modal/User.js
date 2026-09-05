import mongoose, { Document, Schema } from 'mongoose';
const schema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
}, {
    timestamps: true
});
//# sourceMappingURL=User.js.map