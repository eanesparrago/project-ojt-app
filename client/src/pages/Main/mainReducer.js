import { combineReducers } from "redux";

import { dataReducer } from "./data/dataReducer";

export const mainReducer = combineReducers({
  data: dataReducer
});
