import { createStore, applyMiddleware } from "redux";
import { rootReducer } from "./rootStore";
import thunk from "redux-thunk";

export const store = createStore(rootReducer, applyMiddleware(thunk));
