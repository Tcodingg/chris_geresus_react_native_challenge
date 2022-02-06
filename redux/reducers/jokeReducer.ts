import { actionTypes, jokeTypes } from "../actions/actionTypes";
import { Actions } from "../actions/actionTypes";

interface initialInterface {
   loading: boolean;
   newJoke: jokeTypes;
   err: any;
}

const initialState: initialInterface = {
   loading: false,
   newJoke: {
      setup: "",
      delivery: "",
      joke: "",
   },
   err: null,
};

export const jokeReducer = (
   state: initialInterface = initialState,
   action: Actions
): initialInterface => {
   switch (action.type) {
      case actionTypes.JOKE_LOADING:
         return {
            ...state,
            loading: true,
         };
      case actionTypes.JOKE_SUCCESS:
         return {
            ...state,
            loading: false,
            newJoke: {
               setup: action.payload.setup,
               delivery: action.payload.delivery,
               joke: action.payload.joke,
            },
            err: null,
         };
      case actionTypes.JOKE_FAIL:
         return {
            ...state,
            loading: false,
            newJoke: {
               setup: "",
               delivery: "",
               joke: "",
            },
            err: action.payload,
         };
      default:
         return state;
   }
};
