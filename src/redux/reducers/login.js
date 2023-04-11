import {
  DATA_INPUT_USER_LOGIN1,
  DATA_INPUT_USER_LOGIN2,
  DATA_DELETE_USER_LOGIN
} from "../actions/login";

let dataState = {
  isLogin: false,
  dataUser: null
};

export const login = (state = dataState, action) => {
  switch (action.type) {
    case DATA_INPUT_USER_LOGIN1:
      return {
        ...state,
        isLogin: action.payload
      };
    case DATA_INPUT_USER_LOGIN2:
      return {
        ...state,
        dataUser: action.payload
      };
    case DATA_DELETE_USER_LOGIN:
      return {
        ...state,
        isLogin: false,
        dataUser: null
      };
    default:
      return state;
  }
};
