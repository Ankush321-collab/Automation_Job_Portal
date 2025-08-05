import { configureStore } from '@reduxjs/toolkit';
import jobreducer from './slice/job_slice.js'
import userreducer from './slice/User_slice.js'
import applicationreducer from './slice/application_slice.js'
import updateprofilereducer from './slice/UpdateProfile_slice.js'

const store=configureStore({
    reducer:{
        jobs:jobreducer,
        user:userreducer,
        application:applicationreducer,
        updateprofile:updateprofilereducer,
    },
    devTools: process.env.NODE_ENV !== 'production',
})

export default store