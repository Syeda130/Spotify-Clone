import { Router } from "express";
import { getAllUsers, getMessages } from "../controller/user.controller.js";
import { protectRoute} from "../middleware/auth.middleware.js";

const router = Router();

router.get("/", protectRoute, getAllUsers);
router.get("/messages/:userId", protectRoute, getMessages);


export default router;