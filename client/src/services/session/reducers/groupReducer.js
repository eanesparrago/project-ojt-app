import {
  GROUP_GET_FAILURE,
  GROUP_GET_REQUEST,
  GROUP_GET_SUCCESS
} from "../actions/groupActionCreators";

const initialState = {
  data: null,
  isLoading: false,
  errors: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GROUP_GET_REQUEST:
      return { ...state, isLoading: true };
    case GROUP_GET_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.payload
      };
    case GROUP_GET_FAILURE:
      return {
        ...state,
        isLoading: false,
        errors: action.payload
      };

    default:
      return state;
  }
};
