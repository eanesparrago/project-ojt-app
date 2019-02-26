import { combineReducers } from "redux";
import _ from "lodash";

import groupsReducer from "./scenes/Groups/groupsReducer";
import peopleReducer from "./scenes/People/peopleReducer";

// const initialState = {};
// export default (state = initialState, action) => {
//   switch (action.type) {
//     default:
//       const rest = _.omit(state, Object.keys(initialState));
//       return {
//         ...state,
//         groups: groupsReducer
//       };
//   }
// };

export default combineReducers({
  groups: groupsReducer,
  people: peopleReducer
});

