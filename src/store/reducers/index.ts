import authReducer from "./auth.reducer";
import { combineReducers } from "redux";

const appReducers = combineReducers({
  auth: authReducer,
});

export default appReducers;
