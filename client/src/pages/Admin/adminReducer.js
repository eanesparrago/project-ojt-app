import { combineReducers } from "redux";
import _ from "lodash";

import departmentsReducer from "./scenes/Departments/departmentsReducer";

// const initialState = {};
// export default (state = initialState, action) => {
//   switch (action.type) {
//     default:
//       const rest = _.omit(state, Object.keys(initialState));
//       return {
//         ...state,
//         departments: departmentsReducer
//       };
//   }
// };

export default combineReducers({
  departments: departmentsReducer
});

