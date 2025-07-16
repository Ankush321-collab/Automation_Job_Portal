import express from 'express';
import { postjob, getalljobs, getmyjob, deletejob, getASingleJob } from "../Controller/job.controller.js";
import { isauthenticated, isAuthorized } from '../Middlewares/auth.js';
const router=express.Router();

router.post('/postjob',isauthenticated,isAuthorized("employer"),postjob);
router.get("/getalljobs",getalljobs);
router.get("/getmyjob",isauthenticated,isAuthorized("employer"),getmyjob);
router.delete("/delete/:id",isauthenticated,isAuthorized("employer"),deletejob)
router.get("/get/:id",getASingleJob)

export default router;