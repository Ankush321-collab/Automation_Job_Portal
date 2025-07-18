import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios';


const jobSlice=createSlice({
    name:"jobs",
    initialState:{
        jobs:[],
        loading:false,
        error:null,
        message:null,
        singlejob:{},
        myjob:{}
    },
    reducers:{
        requestforalljobs(state,action){
            state.loading=true,
            state.error=null
        },
        successforalljob(state,action){
             state.loading=false;
             state.jobs=action.payload;
          state.error=null
        },
        failurforalljobs(state,action){
            state.loading=false;
            state.error=action.payload
        },
        requestforsinglejob(state,action){
            state.message=null;
            state.error=null;
            state.loading=true;
        },
        successforsinglejob(state,action){
            state.loading=false;
            state.error=null;
            state.singlejob=action.payload;
        },
        failurforsinglejob(state,action){
            state.singlejob=state.singlejob;
            state.error=action.payload;
            state.loading=false;
        },
         
    requestForPostJob(state, action) {
      state.message = null;
      state.error = null;
      state.loading = true;
    },
    successForPostJob(state, action) {
      state.message = action.payload;
      state.error = null;
      state.loading = false;
    },
    failureForPostJob(state, action) {
        state.message = null;
        state.error = action.payload;
        state.loading = false;
      },
      requestForDeleteJob(state, action) {
        state.loading = true;
        state.error = null;
        state.message = null;
      },
      successForDeleteJob(state, action) {
        state.loading = false;
        state.error = null;
        state.message = action.payload;
      },
      failureForDeleteJob(state, action) {
        state.loading = false;
        state.error = action.payload;
        state.message = null;
      },
  
      requestForMyJobs(state, action) {
        state.loading = true;
        state.myJobs = [];
        state.error = null;
      },
      successForMyJobs(state, action) {
        state.loading = false;
        state.myJobs = action.payload;
        state.error = null;
      },
      failureForMyJobs(state, action) {
        state.loading = false;
        state.myJobs = state.myJobs;
        state.error = action.payload;
      },
  
      clearAllErrors(state, action) {
        state.error = null;
        state.jobs = state.jobs;
      },
      resetJobSlice(state, action) {
        state.error = null;
        state.jobs = state.jobs;
        state.loading = false;
        state.message = null;
        state.myJobs = state.myJobs;
        state.singleJob = {};
      },
    },

});