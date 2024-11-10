import { Router } from "express";

const router = Router();

router.get('/', (req,res) => {
    req.auth.userId;
    res.send("user route with GET method");
});



export default router