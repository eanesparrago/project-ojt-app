import {
  GROUP_OWN_GET_FAILURE,
  GROUP_OWN_GET_REQUEST,
  GROUP_OWN_GET_SUCCESS,
  GROUP_GET_REQUEST,
  GROUP_GET_SUCCESS,
  GROUP_GET_FAILURE,
  GROUP_EDIT_REQUEST,
  GROUP_EDIT_SUCCESS,
  GROUP_EDIT_FAILURE
} from "../actions/groupActionCreators";

const initialState = {
  data: null,
  isLoading: false,
  errors: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GROUP_OWN_GET_REQUEST:
      return { ...state, isLoading: true };
    case GROUP_OWN_GET_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.payload
      };
    case GROUP_OWN_GET_FAILURE:
      return {
        ...state,
        isLoading: false,
        errors: action.payload
      };

    case GROUP_GET_REQUEST:
      return {
        ...state,
        data: initialState.data,
        isLoading: true
      };
    case GROUP_GET_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.payload,
        errors: initialState.errors
      };
    case GROUP_GET_FAILURE:
      return {
        ...state,
        isLoading: false,
        errors: action.payload
      };

    case GROUP_EDIT_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case GROUP_EDIT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.payload,
        errors: initialState.errors
      };
    case GROUP_EDIT_FAILURE:
      return {
        ...state,
        isLoading: false,
        errors: action.payload
      };

    default:
      return state;
  }
};
