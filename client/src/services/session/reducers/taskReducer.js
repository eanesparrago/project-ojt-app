import {
  TASK_LOADING_SET,
  TASK_LOADING_UNSET,
  TASK_DATA_CLEAR,
  TASK_ERRORS_SET,
  TASK_ERRORS_CLEAR,
  TASK_GET,
  TASK_EDIT
} from "../actions/taskActionCreators";

const initialState = {
  data: null,
  isLoading: false,
  errors: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case TASK_LOADING_SET:
      return {
        ...state,
        isLoading: true
      };

    case TASK_LOADING_UNSET:
      return {
        ...state,
        isLoading: false
      };

    case TASK_DATA_CLEAR:
      return {
        ...state,
        data: initialState.data
      };

    case TASK_ERRORS_SET:
      return {
        ...state,
        errors: action.payload
      };

    case TASK_ERRORS_CLEAR:
      return {
        ...state,
        errors: initialState.errors
      };

    case TASK_GET:
      return {
        ...state,
        data: action.payload
      };

    case TASK_EDIT:
      return {
        ...state,
        data: action.payload
      };

    default:
      return state;
  }
}
