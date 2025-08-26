import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const applicationSlice=createSlice({
    name:"application",
    initialState:{
        applications:[],
        loading:false,
        error:null,
        message:null,
    },
    reducers:{
        allApplicationRequest(state,action){
            state.loading=true;
            state.error=null;
        },
        allApplicationSuccess(state,action){
            state.loading=false;
            state.applications=action.payload;
            state.error=null;
        },
        allApplicationFailure(state,action){
            state.loading=false;
            state.error=action.payload;
        },
        requestForMyApplications(state,action){
            state.loading=true;
            state.error=null;
        },
        successForMyApplications(state,action){
            state.loading=false;
            state.applications=action.payload;
            state.error=null;
        },
        failureForMyApplications(state,action){
            state.loading = false;
            state.error = action.payload;
        },
        requestForPostApplication(state, action) {
            state.loading = true;
            state.error = null;
            state.message = null;
        },
        successForPostApplication(state, action) {
            state.loading = false;
            state.error = null;
            state.message = action.payload;
        },
        failureForPostApplication(state, action) {
            state.loading = false;
            state.error = action.payload;
            state.message = null;
        },
        requestForDeleteApplication(state, action) {
            state.loading = true;
            state.error = null;
            state.message = null;
        },
        successForDeleteApplication(state, action) {
            state.loading = false;
            state.error = null;
            state.message = action.payload;
        },
        failureForDeleteApplication(state, action) {
            state.loading = false;
            state.error = action.payload;
            state.message = null;
        },
        clearAllErrors(state, action) {
            state.error = null;
        },
        resetApplicationSlice(state, action) {
            state.error = null;
            state.applications = state.applications;
            state.message = null;
            state.loading = false;
        },
    }
});


export const fetchemployerapplication=()=>async(dispatch)=>{
    dispatch(applicationSlice.actions.allApplicationRequest());
    try{
        const response=await axios.get("https://automation-job-portal.onrender.com/api/employer/getallapplication",
            {
                withCredentials:true
            }
        );
        dispatch(applicationSlice.actions.allApplicationSuccess(response.data.application))
        dispatch(applicationSlice.actions.clearAllErrors());

    }
    catch(error){
        dispatch(applicationSlice.actions.allApplicationFailure(error.response.data.message));

    }
}
export const fetchJobSeekerApplications = () => async (dispatch) => {
    dispatch(applicationSlice.actions.requestForMyApplications());
    try {
      const response = await axios.get(
        `https://automation-job-portal.onrender.com/api/jobseeker/getall`,
        {
          withCredentials: true,
        }
      );
      dispatch(
        applicationSlice.actions.successForMyApplications(
          response.data.applications
        )
      );
      dispatch(applicationSlice.actions.clearAllErrors());
    } catch (error) {
      dispatch(
        applicationSlice.actions.failureForMyApplications(
          error.response.data.message
        )
      );
    }
  };
  
  export const postApplication = (data, jobId) => async (dispatch) => {
    dispatch(applicationSlice.actions.requestForPostApplication());
    try {
      const response = await axios.post(
        `https://automation-job-portal.onrender.com/api/post/${jobId}`,
        data,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      dispatch(
        applicationSlice.actions.successForPostApplication(response.data.message)
      );
      dispatch(applicationSlice.actions.clearAllErrors());
    } catch (error) {
      dispatch(
        applicationSlice.actions.failureForPostApplication(
          error.response.data.message
        )
      );
    }
  };
  
  export const deleteApplication = (id) => async (dispatch) => {
    dispatch(applicationSlice.actions.requestForDeleteApplication());
    try {
      const response = await axios.delete(
        `https://automation-job-portal.onrender.com/api/deleteapplication/${id}`,
        { withCredentials: true }
      );
      dispatch(
        applicationSlice.actions.successForDeleteApplication(
          response.data.message
        )
      );
      dispatch(applicationSlice.actions.clearAllErrors());
    } catch (error) {
      dispatch(
        applicationSlice.actions.failureForDeleteApplication(
          error.response.data.message
        )
      );
    }
  };
  
  export const clearAllApplicationErrors = () => (dispatch) => {
    dispatch(applicationSlice.actions.clearAllErrors());
  };
  
  export const resetApplicationSlice = () => (dispatch) => {
    dispatch(applicationSlice.actions.resetApplicationSlice());
  };
  
  export default applicationSlice.reducer;