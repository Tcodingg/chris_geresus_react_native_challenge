import { Actions, actionTypes } from "../actions/actionTypes";

interface punchlineInterface {
   showPunchline: boolean;
}

const initialState: punchlineInterface = {
   showPunchline: false,
};

export const punchlineReducer = (
   state: punchlineInterface = initialState,
   action: Actions
): punchlineInterface => {
   switch (action.type) {
      case actionTypes.OPEN_PUNCHLINE:
         return {
            showPunchline: true,
         };
      case actionTypes.CLOSE_PUNCHLINE:
         return {
            showPunchline: false,
         };
      default:
         return state;
   }
};
