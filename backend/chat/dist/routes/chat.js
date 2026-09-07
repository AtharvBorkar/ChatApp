import express from 'express';
import { creatNewChat } from '../controllers/chat.js';
import { isAuth } from '../middlewares/isAuth.js';
const router = express.Router();
router.post("/chat/new", isAuth, creatNewChat);
export default router;
//# sourceMappingURL=chat.js.map