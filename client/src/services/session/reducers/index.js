import { combineReducers } from "redux";

import authReducer from "./authReducer";
import appReducer from "./appReducer";
import groupsReducer from "./groupsReducer";
import peopleReducer from "./peopleReducer";
import userReducer from "./userReducer";
import announcementsReducer from "./announcementsReducer";
import groupReducer from "./groupReducer";
import personReducer from "./personReducer";
import taskReducer from "./taskReducer";

export default combineReducers({
  auth: authReducer,
  app: appReducer,
  groups: groupsReducer,
  people: peopleReducer,
  user: userReducer,
  announcements: announcementsReducer,
  group: groupReducer,
  person: personReducer,
  task: taskReducer
});
