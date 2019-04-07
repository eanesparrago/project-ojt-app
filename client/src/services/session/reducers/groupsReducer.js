import {
  GROUPS_GET_REQUEST,
  GROUPS_GET_SUCCESS,
  GROUPS_GET_FAILURE,
  GROUPS_CREATE_REQUEST,
  GROUPS_CREATE_SUCCESS,
  GROUPS_CREATE_FAILURE,
  GROUPS_DELETE_REQUEST,
  GROUPS_DELETE_SUCCESS,
  GROUPS_DELETE_FAILURE
} from "../actions/groupsActionCreators";

import { GROUP_EDIT_SUCCESS } from "../actions/groupActionCreators";

const initialState = {
  data: [],
  isLoading: false,
  errors: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GROUPS_GET_REQUEST:
      return { ...state, isLoading: true, data: initialState.data };
    case GROUPS_GET_SUCCESS:
      return { ...state, data: action.payload, isLoading: false };
    case GROUPS_GET_FAILURE:
      return { ...state, isLoading: false };

    case GROUPS_CREATE_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case GROUPS_CREATE_SUCCESS:
      return {
        ...state,
        data: [...state.data, action.payload],
        isLoading: false,
        errors: initialState.errors
      };
    case GROUPS_CREATE_FAILURE:
      return {
        ...state,
        isLoading: false,
        errors: action.payload
      };

    case GROUPS_DELETE_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case GROUPS_DELETE_SUCCESS:
      return {
        ...state,
        data: state.data.filter(group => group._id !== action.payload._id),
        isLoading: false,
        errors: initialState.errors
      };
    case GROUPS_DELETE_FAILURE:
      return {
        ...state,
        isLoading: false,
        errors: action.payload
      };

    // >>> GROUP
    case GROUP_EDIT_SUCCESS:
      return {
        ...state,
        data: state.data.map(group =>
          group._id === action.payload._id ? action.payload : group
        )
      };

    default:
      return state;
  }
};
