import {
  USER_GET_FAILURE,
  USER_GET_REQUEST,
  USER_GET_SUCCESS
} from "../actions/userActionCreators";

const initialState = {
  data: {
    roleData: {}
  },
  isLoading: false,
  errors: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case USER_GET_REQUEST:
      return {
        ...state,
        isLoading: true,
        errors: initialState.errors
      };

    case USER_GET_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.payload,
        errors: initialState.errors
      };

    case USER_GET_FAILURE:
      return {
        ...state,
        isLoading: false,
        errors: action.payload
      };

    default:
      return state;
  }
};
