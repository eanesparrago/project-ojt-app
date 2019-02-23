import { combineReducers } from "redux";

import mainReducer from "src/pages/Main/mainReducer";
import adminReducer from "src/pages/Admin/adminReducer";
import authReducer from "./authReducer";

export default combineReducers({
  main: mainReducer,
  admin: adminReducer,
  auth: authReducer
});
