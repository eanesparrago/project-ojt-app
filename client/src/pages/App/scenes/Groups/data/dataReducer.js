import { combineReducers } from "redux";

import groupsReducer from "./groups/groupsReducer";

export const dataReducer = combineReducers({
  groups: groupsReducer
});
