import { combineReducers } from "redux";

import { mainReducer } from "../../../pages/Main/mainReducer";
import { adminReducer } from "src/pages/Admin/adminReducer";

export default combineReducers({
  main: mainReducer,
  admin: adminReducer
});
