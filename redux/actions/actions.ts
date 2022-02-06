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
