import {
  TASKS_OWN_GET_REQUEST,
  TASKS_OWN_GET_SUCCESS,
  TASKS_OWN_GET_FAILURE,
  TASKS_USER_GET_REQUEST,
  TASKS_USER_GET_SUCCESS,
  TASKS_USER_GET_FAILURE
} from "../actions/tasksActionCreators";

const initialState = {
  data: null,
  isLoading: false,
  errors: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case TASKS_OWN_GET_REQUEST:
      return {
        ...state,
        isLoading: true,
        errors: initialState.errors
      };
    case TASKS_OWN_GET_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.payload
      };
    case TASKS_OWN_GET_FAILURE:
      return {
        ...state,
        data: initialState.data,
        errors: action.payload
      };

    case TASKS_USER_GET_REQUEST:
      return {
        ...state,
        isLoading: true,
        errors: initialState.errors
      };
    case TASKS_USER_GET_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.payload
      };
    case TASKS_USER_GET_FAILURE:
      return {
        ...state,
        data: initialState.data,
        errors: action.payload
      };

    default:
      return state;
  }
}
