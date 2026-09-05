import mongoose, {Document, Schema} from 'mongoose';

export interface IUser extends Document {
    name: string;
    email: string;
    // password: string;
    // createdAt: Date;
    // updatedAt: Date;
}

const schema: Schema<IUser> = new Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
},
{
    timestamps: true
}
)