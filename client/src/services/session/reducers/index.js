import { combineReducers } from "redux";

import mainReducer from "src/pages/Main/mainReducer";
import adminReducer from "src/pages/Admin/adminReducer";
import authReducer from "./authReducer";
import appReducer from "./appReducer";

export default combineReducers({
  main: mainReducer,
  admin: adminReducer,
  auth: authReducer,
  app: appReducer
});
