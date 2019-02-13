import { combineReducers } from "redux";

import { mainReducer } from "../../../pages/Main/mainReducer";

export default combineReducers({
  main: mainReducer
});
