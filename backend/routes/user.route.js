import { login, signup } from "../Controller/User.Controller.js";
import express from 'express';

const router=express.Router();

router.post('/signup',signup)
router.post('/login',login)

export default router;