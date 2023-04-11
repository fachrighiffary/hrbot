import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { DATA_DELETE_USER_LOGIN } from "./actions/login";
import { login } from "./reducers/login";
import { dataChats } from "./reducers/chat";

const appReducer = combineReducers({
  login,
  dataChats
});

const rootReducer = (state, action) => {
  if (action.type === DATA_DELETE_USER_LOGIN) {
    state = undefined;
  }
  return appReducer(state, action);
};

export default createStore(rootReducer, applyMiddleware(thunk));
