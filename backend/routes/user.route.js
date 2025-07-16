import {  getalluser, getuser, login, logout, signup, updatepasswords, updateprofile } from "../Controller/User.Controller.js";
import express from 'express';
import { isauthenticated } from "../Middlewares/auth.js";

const router=express.Router();

router.post('/signup',signup);
router.post('/login',login);
router.post('/logout',isauthenticated,logout);
router.get('/user',getuser)
router.get('/alluser',isauthenticated,getalluser);
router.put('/updateprofile',isauthenticated,updateprofile);
router.put('/updatepassword',isauthenticated,updatepasswords)


export default router;