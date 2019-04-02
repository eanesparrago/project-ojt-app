import {
  TASK_CREATE_REQUEST,
  TASK_CREATE_SUCCESS,
  TASK_CREATE_FAILURE,
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

    case TASK_ERRORS_CLEAR:
      return {
        ...state,
        errors: initialState.errors
      };

    default:
      return state;
  }
}
