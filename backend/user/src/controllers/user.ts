import TryCatch from "../config/TryCatch.js";
import { redisClient } from "../index.js";

export const loginUser = TryCatch(async(req, res)=>{
    const {email}= req.body
    const rateLimitKey = `otp:ratelimit:${email}`
    const rateLimit = await redisClient.get(rateLimitKey)
})