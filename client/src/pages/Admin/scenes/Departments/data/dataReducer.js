import { combineReducers } from "redux";

import departmentsReducer from "./departments/departmentsReducer";

export const dataReducer = combineReducers({
  departments: departmentsReducer
});
