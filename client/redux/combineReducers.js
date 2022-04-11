import { combineReducers } from "redux";
import reducer from "./reducer";

const appReducer = combineReducers({
  reducer: reducer,
});

export default appReducer;
