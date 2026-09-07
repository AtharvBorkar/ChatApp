import express from 'express';
import upload from '../middlewares/multer.js';
import { creatNewChat, getAllChats, sendMessage } from '../controllers/chat.js';
import { isAuth } from '../middlewares/isAuth.js';

const router = express.Router();

router.post("/chat/new", isAuth, creatNewChat)
router.get("/chat/all", isAuth, getAllChats)
router.post("/message", isAuth, upload.single("image"), sendMessage)

export default router