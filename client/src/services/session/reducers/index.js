import { combineReducers } from "redux";

import mainReducer from "src/pages/Main/mainReducer";
import authReducer from "./authReducer";
import appReducer from "./appReducer";
import groupsReducer from "./groupsReducer";
import peopleReducer from "./peopleReducer";

export default combineReducers({
  main: mainReducer,
  auth: authReducer,
  app: appReducer,
  groups: groupsReducer,
  people: peopleReducer
});
