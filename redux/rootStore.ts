import { punchlineReducer } from "./reducers/punchlineReducer";
import { combineReducers } from "redux";
import { jokeReducer } from "./reducers/jokeReducer";
export const rootReducer = combineReducers({
   jokeReducer,
   punchlineReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
