import mongoose from 'mongoose';
const connectDB = async () => {
    const url = process.env.MONGO_URI;
    if (!url) {
        throw new Error('MONGO_URI is not defined in environment variables');
    }
    try {
        await mongoose.connect(url, {
            dbName: 'chatappmicroserviceapp',
        });
        console.log('Connected to MongoDB');
    }
    catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
};
export default connectDB;
//# sourceMappingURL=db.js.map