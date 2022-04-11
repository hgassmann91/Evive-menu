import { createStore, applyMiddleware } from "redux";
import appReducer from "./redux/combineReducers";
import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";

const store = createStore(
  appReducer,
  applyMiddleware(thunkMiddleware, createLogger())
);

export default store;

//additional optional features and what they do below:

// import axios from "axios";

// let middleware = [
//   // `withExtraArgument` gives us access to axios in our async action creators!
//   // https://github.com/reduxjs/redux-thunk#injecting-a-custom-argument
//   thunkMiddleware.withExtraArgument({ axios }),
// ];
// if (process.browser) {
//   // We'd like the redux logger to only log messages when it's running in the
//   // browser, and not when we run the tests from within Mocha.
//   middleware = [...middleware, createLogger({ collapsed: true })];
// }

// /** We wrap the entire redux store in a root reducer with a special
//  * action, RESET_STORE. It calls our application's reducer with
//  * state = undefined. This will trigger each of our sub-reducers
//  * to reset back to their initial state. This will come in
//  * handy when we need to reset our redux store in between tests.
//  */
// const RESET_STORE = "RESET_STORE";
// export const resetStore = () => ({ type: RESET_STORE });
// const rootReducer = (state, action) => {
//   if (action.type === RESET_STORE) {
//     state = undefined;
//     return appReducers(state, action);
//   }
//   return appReducers(state, action);
// };
