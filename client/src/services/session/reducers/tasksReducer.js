import {
  TASKS_LOADING_SET,
  TASKS_LOADING_UNSET,
  TASKS_ERRORS_SET,
  TASKS_ERRORS_CLEAR,
  TASKS_GET,
  TASKS_CREATE,
  TASKS_DELETE
} from "../actions/tasksActionCreators";

import { TASK_EDIT } from "../actions/taskActionCreators";

const initialState = {
  data: null,
  isLoading: false,
  errors: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case TASKS_LOADING_SET:
      return {
        ...state,
        isLoading: true
      };

    case TASKS_LOADING_UNSET:
      return {
        ...state,
        isLoading: false
      };

    case TASKS_ERRORS_SET:
      return {
        ...state,
        errors: action.payload
      };

    case TASKS_ERRORS_CLEAR:
      return {
        ...state,
        errors: initialState.errors
      };

    case TASKS_GET:
      return {
        ...state,
        data: action.payload
      };

    case TASKS_CREATE:
      return {
        ...state,
        data: [...state.data, action.payload]
      };

    case TASKS_DELETE:
      return {
        ...state,
        data: state.data.filter(task => task._id !== action.payload._id)
      };

    // >>> TASK
    case TASK_EDIT:
      return {
        ...state,
        data: state.data.map(task =>
          task._id === action.payload._id ? action.payload : task
        )
      };

    default:
      return state;
  }
}
