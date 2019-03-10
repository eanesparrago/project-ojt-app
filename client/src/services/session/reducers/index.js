import { combineReducers } from "redux";

import authReducer from "./authReducer";
import appReducer from "./appReducer";
import groupsReducer from "./groupsReducer";
import peopleReducer from "./peopleReducer";

export default combineReducers({
  auth: authReducer,
  app: appReducer,
  groups: groupsReducer,
  people: peopleReducer
});
