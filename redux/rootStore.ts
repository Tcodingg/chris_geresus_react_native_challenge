import { combineReducers } from "redux";
import { jokeReducer } from "./reducers/jokeReducer";
export const rootReducer = combineReducers({
   jokeReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
