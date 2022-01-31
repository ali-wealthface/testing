import { appLocalStorage } from "config";
import {
  AUTH_ON_LOAD_LOGIN,
  AUTH_TOKEN_NOT_FOUND,
  AUTH_USER_LOGGED_IN,
  AUTH_USER_LOGGED_OUT,
} from "../store.types";

interface IAuthAction {
  type: string;
  payload?: any;
}

export interface IAuthState {
  isLoggedIn: boolean;
  username: string;
}

const INITIAL_AUTH_STATE: IAuthState = {
  isLoggedIn: false,
  username: "",
};

const authReducer = (state = INITIAL_AUTH_STATE, action: IAuthAction) => {
  switch (action.type) {
    case AUTH_USER_LOGGED_IN:
      return {
        ...state,
        isLoggedIn: true,
        username: "John Doe",
      };
    case AUTH_ON_LOAD_LOGIN:
      return {
        ...state,
        isLoggedIn: true,
        username: "John Doe",
      };
    case AUTH_USER_LOGGED_OUT:
      localStorage.removeItem(appLocalStorage.APP_TOKEN);
      return {
        ...state,
        isLoggedIn: false,
        username: "",
      };
    case AUTH_TOKEN_NOT_FOUND:
      return {
        ...state,
        isLoggedIn: false,
        username: "",
      };

    default:
      return state;
  }
};

export default authReducer;
