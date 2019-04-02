import {
  TASK_CREATE_REQUEST,
  TASK_CREATE_SUCCESS,
  TASK_CREATE_FAILURE,
  TASK_GET_REQUEST,
  TASK_GET_SUCCESS,
  TASK_GET_FAILURE,
  TASK_EDIT_REQUEST,
  TASK_EDIT_SUCCESS,
  TASK_EDIT_FAILURE,
  TASK_DELETE_REQUEST,
  TASK_DELETE_SUCCESS,
  TASK_DELETE_FAILURE,
  TASK_ERRORS_CLEAR
} from "../actions/taskActionCreators";

const initialState = {
  data: null,
  isLoading: false,
  errors: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case TASK_CREATE_REQUEST:
      return {
        ...state,
        isLoading: true,
        errors: initialState.errors
      };
    case TASK_CREATE_SUCCESS:
      return {
        ...state,
        isLoading: false
      };
    case TASK_CREATE_FAILURE:
      return {
        ...state,
        isLoading: false,
        errors: action.payload
      };

    case TASK_GET_REQUEST:
      return {
        ...state,
        isLoading: true,
        errors: initialState.errors
      };
    case TASK_GET_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.payload
      };
    case TASK_GET_FAILURE:
      return {
        ...state,
        isLoading: false,
        data: initialState.data
      };

    case TASK_EDIT_REQUEST:
      return {
        ...state,
        isLoading: true,
        errors: initialState.errors
      };
    case TASK_EDIT_SUCCESS:
      return {
        ...state,
        isLoading: false
      };
    case TASK_EDIT_FAILURE:
      return {
        ...state,
        isLoading: false,
        errors: action.payload
      };

    case TASK_DELETE_REQUEST:
      return {
        ...state,
        isLoading: true,
        errors: initialState.errors
      };
    case TASK_DELETE_SUCCESS:
      return {
        ...state,
        isLoading: false
      };
    case TASK_DELETE_FAILURE:
      return {
        ...state,
        isLoading: false,
        errors: action.payload
      };

    case TASK_ERRORS_CLEAR:
      return {
        ...state,
        errors: initialState.errors
      };

    default:
      return state;
  }
}
