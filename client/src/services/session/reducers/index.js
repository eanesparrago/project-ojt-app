import { combineReducers } from "redux";

import mainReducer from "../../../pages/Main/mainReducer";
import adminReducer from "src/pages/Admin/adminReducer";
import authReducer from "./authReducer";

export default combineReducers({
  main: mainReducer,
  admin: adminReducer,
  auth: authReducer
});
