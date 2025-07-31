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
        state.myjob = [];
        state.error = null;
      },
      successForMyJobs(state, action) {
        state.loading = false;
        state.myjob = action.payload;
        state.error = null;
      },
      failureForMyJobs(state, action) {
        state.loading = false;
        state.myjob = state.myjob;
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
        state.myjob = state.myjob;
        state.singlejob = {};
      },
    },

});

export const fetchjobs=
(city,preference,keyword = "")=>
  async(dispatch)=>{

    try{
      dispatch(jobSlice.actions.requestforalljobs());
      let link="http://localhost:5000/api/getalljobs?"
      let query=[];
      if(keyword){
        query.push(`keyword=${keyword}`)
      }
      if(city){
        query.push(`city=${city}`)
      }
      if (preference) {
        query.push(`preference=${preference}`)
      }

      link+=query.join("&")
      const response=await axios.get(link,{
        withCredentials:true,
      });
      dispatch(jobSlice.actions.successforalljob(response.data.jobs))
      dispatch(jobSlice.actions.clearAllErrors())



    }
    catch(error){
      dispatch(jobSlice.actions.failurforalljobs(error.response.data.message));

    }

  }
  export const fetchsinglejob=(jobid)=>async(dispatch)=>{
    dispatch(jobSlice.actions.requestforsinglejob());
    try{
      const response=await axios.get(`http://localhost:5000/api/get/${jobid}`,{
        withCredentials:true,
      })
      dispatch(jobSlice.actions.successforsinglejob(response.data.job))
      dispatch(jobSlice.actions.clearAllErrors());

    }
    catch(error){
      dispatch(jobSlice.actions.failurforsinglejob(error.response.data.message));

    }

  }

  export const postjob=(data)=>async(dispatch)=>{
    dispatch(jobSlice.actions.requestForPostJob());

    try{
      const response=await axios.post(`http://localhost:5000/api/postjob`,data,{
        withCredentials:true,
        headers:{"Content-Type":"application/json"}
      })
      dispatch(jobSlice.actions.successForPostJob(response.data.message));

    }
    catch(error){
      dispatch(jobSlice.actions.failureForPostJob(error.response.data.message));

    }
  }

  export const getmyjob=()=>async(dispatch)=>{
    dispatch(jobSlice.actions.requestForMyJobs());
    try {
      const response = await axios.get(
        `https://job-portal-backend-sifx.onrender.com/api/v1/job/getmyjobs`,
        { withCredentials: true }
      );
      dispatch(jobSlice.actions.successForMyJobs(response.data.myJobs));
      dispatch(jobSlice.actions.clearAllErrors());
    } catch (error) {
      dispatch(jobSlice.actions.failureForMyJobs(error.response.data.message));
    }
  };
  export const clearAllJobErrors = () => (dispatch) => {
    dispatch(jobSlice.actions.clearAllErrors());
  };

  
  export const resetJobSlice=()=>(dispatch)=>{
    dispatch(jobSlice.actions.resetJobSlice())
  }

  export default jobSlice.reducer;