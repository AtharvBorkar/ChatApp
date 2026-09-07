import multer from "multer"
import {CloudinaryStorage} from "multer-storage-cloudinary"
import cloudinary from "../config/cloudinary.js"

const storage  = new CloudinaryStorage({
    cloudinary: cloudinary,
    params:{
        folder:"chat-images",
        allowed_formats: ["jpg", "jpeg", "png", "gif", "webp"],
        transforamations: [{width: 800, height: 600, crop: "limit"}],
    }
})