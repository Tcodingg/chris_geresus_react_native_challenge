import { Actions, actionTypes } from "../actions/actionTypes";

const initialState: boolean = false;

export const punchlineReducer = (state = initialState, action: Actions) => {
   switch (action.type) {
      case actionTypes.OPEN_PUNCHLINE:
         return true;
      case actionTypes.CLOSE_PUNCHLINE:
         return false;
      default:
         return state;
   }
};
