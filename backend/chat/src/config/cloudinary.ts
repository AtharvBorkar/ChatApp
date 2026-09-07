import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config()

const cloud_name = process.env.CLOUD_NAME
const api_key = process.env.API_KEY
const api_secret = process.env.API_SECRET

if (!cloud_name || !api_key || !api_secret) {
    throw new Error("Missing Cloudinary environment variables")
}

cloudinary.config({ cloud_name, api_key, api_secret })

export default cloudinary