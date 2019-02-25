import _ from "lodash";
import {
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGIN_FAILURE
} from "../actions/authActionCreators";

const initialState = {
  isLoading: false,
  isAuthenticated: false,
  user: {},
  error: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case AUTH_LOGIN_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null
      };

    case AUTH_LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: !_.isEmpty(action.payload),
        user: action.payload
      };

    case AUTH_LOGIN_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload.error
      };

    default:
      return state;
  }
}
