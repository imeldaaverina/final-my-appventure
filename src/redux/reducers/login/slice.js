import { createSlice } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { callAPI } from '../../../helpers/network';
import { useRouter }  from "next/router";

const initialState = {
  loading: false,
  errMessage: {
    title:"",
    content: ""
  },
  succesMessage: {}
};
const slices = createSlice({
  initialState,
  name: 'login',
  reducers: {
    setErrMessage(state, action) {
      Object.assign(state, {
        ...state,
        errMessage: action.payload,
      });
    },
    toggleLoading(state, action) {
      Object.assign(state, {
        ...state,
        loading: action.payload,
      });
    },
  },
});
const { toggleLoading, setErrMessage } = slices.actions;
export const useLoginDispatcher = () => {
  const { login } = useSelector((state) => state);
  const dispatch = useDispatch();
  const makeLoading = (loading) => dispatch(toggleLoading(loading));

  const {push} = useRouter();

  const doLogin = async (payload) => {
    dispatch(toggleLoading(true));
    try{
    const response = await callAPI({
      url: '/user-login/login',
      method: 'POST',
      data: payload,
    });
    const { data } = response;
    if (data.status === "404") {
        console.log(`error > ${data.message}`);
        dispatch(toggleLoading(false));
        dispatch(
          setErrMessage({
            title: "Oops... terjadi kesalahan",
            content: data.message,
          })
        );
        return;
      }
    
      localStorage.setItem("access_token", data.access_token);
      push('/success_login');
      dispatch(toggleLoading(false));
   
      
    } catch (error) {
      console.log("error > ", error);
    }
  };

  
  return {
    login,
    doLogin,
    makeLoading,
    // getDatauser,
  };
};
export default slices.reducer;
