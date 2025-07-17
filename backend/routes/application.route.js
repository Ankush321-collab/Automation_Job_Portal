import express from 'express'
import { deleteapplication, employergetallapplication, jobseekergetallapplication, postapplication } from '../Controller/application.controller.js'
import { isauthenticated, isAuthorized } from '../Middlewares/auth.js';
;

const router=express.Router();


router.post('/post/:id',isauthenticated,isAuthorized("job seeker"),postapplication);
router.get('/employer/getallapplication',isauthenticated,isAuthorized("employer"),employergetallapplication);
router.get('/jobseeker/getallapplication',isauthenticated,isAuthorized("job seeker"),jobseekergetallapplication);
router.delete('/deleteapplication/:id',isauthenticated,deleteapplication)

export default router;