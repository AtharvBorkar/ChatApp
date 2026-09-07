import express from 'express';
import { creatNewChat, getAllChats } from '../controllers/chat.js';
import { isAuth } from '../middlewares/isAuth.js';

const router = express.Router();

router.post("/chat/new", isAuth, creatNewChat)
router.get("/chat/all", isAuth, getAllChats)

export default router