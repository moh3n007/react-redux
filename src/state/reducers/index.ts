import { combineReducers } from "redux";
import userReducer from "./userReducer";
import modalReducer from "./modalReducer";
import postsReducer from "./postsReducer";

const reducers = combineReducers({
  user: userReducer,
  modal: modalReducer,
  posts: postsReducer,
});

export default reducers;

export type State = ReturnType<typeof reducers>;
