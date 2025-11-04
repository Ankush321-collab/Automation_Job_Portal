import { createSlice } from "@reduxjs/toolkit"
import api from '../../services/api';


const userSlice=createSlice({
    name:"user",
    initialState:{
        loading:false,
        isAuthenticated:false,
        user:{},
        error:null,
        message:null,
    },
    reducers:{
        requestforregister(state,action){
           state.loading=true;
           state.isAuthenticated=false;
           state.user={};
           state.error=null;
           state.message=null;

        },
        successforregister(state,action){
            state.loading=false;
            state.isAuthenticated=true;
            state.user=action.payload.user;
            state.error=null;
            state.message=action.payload.message;
        },
        failureforregister(state,action){
            state.loading=false;
            state.isAuthenticated=false;
            state.user={};
            state.error=action.payload;
            state.message=null;


        },
        loginrequest(state,action){
            state.loading=true;
            state.isAuthenticated=false;
            state.user={};
            state.error=null;
            state.message=null;
        },
        loginsuccess(state,action){
            state.loading=false;
            state.isAuthenticated=true;
            state.user={
                ...action.payload.user,
                token: action.payload.token
            };
            state.error=null;
            state.message=action.payload.message;
        },
        loginfailure(state,action){
            state.loading=false;
            state.isAuthenticated=false;
            state.user={};
            state.error=action.payload;
            state.message=null;
        },
        fetchuserrequest(state,action){
            state.loading=true;
            state.isAuthenticated=false;
            state.user={};
            state.error=null;
        },
        fetchusersuccess(state,action){
            state.loading=false;
            state.isAuthenticated=true;
            state.user=action.payload;
            state.error=null;
        },
        fetchuserfailure(state,action){
            state.loading=false;
            state.isAuthenticated=false;
            state.user={};
            state.error=action.payload;
        },

        logoutsuccess(state,action){
            state.loading=false;
            state.isAuthenticated=false;
            state.user={};
            state.error=null;

        },
        logoutfailed(state,action){
            state.loading=false;
            // keep previous state for isAuthenticated and user
            state.error=action.payload;
        },
        clearallerror(state,action){
            state.error=null;
            // keep previous user
        }
        




}
});

export const signup=(data)=>async(dispatch)=>{
    dispatch(userSlice.actions.requestforregister());

    try{
        const config = {
            withCredentials: true,
            headers: {
                "Content-Type": "multipart/form-data",
                "Accept": "application/json"
            }
        };
        
        const response = await axios.post(
            "https://automation-job-portal-h254.onrender.com/api/signup",
            data,
            config
        );
        dispatch(userSlice.actions.successforregister(response.data));
        dispatch(userSlice.actions.clearallerror());

    }
    catch(error){
        dispatch(userSlice.actions.failureforregister(error.response.data.message))

    }
}
export const login = (data) => async (dispatch) => {
    dispatch(userSlice.actions.loginrequest());
    try {
      const response = await axios.post(
        "https://automation-job-portal-h254.onrender.com/api/login",
        data,
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      dispatch(userSlice.actions.loginsuccess(response.data));
      dispatch(userSlice.actions.clearallerror());
    } catch (error) {
      dispatch(userSlice.actions.loginfailure(error.response.data.message));
    }
  };
  
  export const getUser = () => async (dispatch) => {
    dispatch(userSlice.actions.fetchuserrequest());
    try {
      const response = await api.get('/alluser');
      dispatch(userSlice.actions.fetchusersuccess(response.data.users));
      dispatch(userSlice.actions.clearallerror());
    } catch (error) {
      dispatch(userSlice.actions.fetchuserfailure(error.response.data.message || "something went wrong"));
    }
  };
  export const logout = () => async (dispatch) => {
    try {
      const response = await api.post('/logout');

      // Clear local storage
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      
      // Clear Redux state
      dispatch(userSlice.actions.logoutsuccess());
      dispatch(userSlice.actions.clearallerror());
      
      return Promise.resolve(response.data.message || 'Logged out successfully');
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to logout';
      dispatch(userSlice.actions.logoutfailed(errorMessage));
      return Promise.reject(errorMessage);
    }
  };
  
  export const clearAllUserErrors = () => (dispatch) => {
    dispatch(userSlice.actions.clearallerror());
  };
  
  export default userSlice.reducer;

