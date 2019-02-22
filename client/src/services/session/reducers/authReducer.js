import _ from "lodash";
import { AUTH_USER_SET } from "../actions/authActionCreators";

const initialState = {
  isAuthenticated: false,
  user: {},
  errors: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case AUTH_USER_SET:
      return {
        ...state,
        isAuthenticated: !_.isEmpty(action.payload),
        user: action.payload
      };

    default:
      return state;
  }
}
