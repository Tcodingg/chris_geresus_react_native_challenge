import { Actions, actionTypes } from "./actionTypes";
import axios from "axios";
import { Dispatch } from "redux";
import { api } from "../../services/api/constants";

// get joke when button is clicked
export const getJoke = () => async (dispatch: Dispatch<Actions>) => {
   dispatch({
      type: actionTypes.JOKE_LOADING,
   });
   try {
      const { data } = await axios.get(api);
      dispatch({
         type: actionTypes.JOKE_SUCCESS,
         payload: data,
      });
   } catch (error) {
      dispatch({
         type: actionTypes.JOKE_FAIL,
         payload: error,
      });
   }
};

// open and close punchline
export const openPunchline = () => (dispatch: Dispatch<Actions>) => {
   dispatch({
      type: actionTypes.OPEN_PUNCHLINE,
      payload: true,
   });
};
export const closePunchline = () => (dispatch: Dispatch<Actions>) => {
   dispatch({
      type: actionTypes.CLOSE_PUNCHLINE,
      payload: false,
   });
};
