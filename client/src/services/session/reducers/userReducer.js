import {
  USER_GET_REQUEST,
  USER_GET_SUCCESS,
  USER_GET_FAILURE,
  USER_CLOCK_REQUEST,
  USER_CLOCK_SUCCESS,
  USER_CLOCK_FAILURE,
  USER_CLOCK_CORRECTION_REQUEST_REQUEST,
  USER_CLOCK_CORRECTION_REQUEST_SUCCESS,
  USER_CLOCK_CORRECTION_REQUEST_FAILURE,
  USER_CLOCK_CORRECTION_REQUEST_CANCEL_REQUEST,
  USER_CLOCK_CORRECTION_REQUEST_CANCEL_SUCCESS,
  USER_CLOCK_CORRECTION_REQUEST_CANCEL_FAILURE,
  USER_SCHEDULE_UPDATE_REQUEST_REQUEST,
  USER_SCHEDULE_UPDATE_REQUEST_SUCCESS,
  USER_SCHEDULE_UPDATE_REQUEST_FAILURE,
  USER_SCHEDULE_UPDATE_REQUEST_CANCEL_REQUEST,
  USER_SCHEDULE_UPDATE_REQUEST_CANCEL_SUCCESS,
  USER_SCHEDULE_UPDATE_REQUEST_CANCEL_FAILURE,
  USER_LEAVE_REQUEST_REQUEST,
  USER_LEAVE_REQUEST_SUCCESS,
  USER_LEAVE_REQUEST_FAILURE,
  USER_LEAVE_REQUEST_CANCEL_REQUEST,
  USER_LEAVE_REQUEST_CANCEL_SUCCESS,
  USER_LEAVE_REQUEST_CANCEL_FAILURE,
  USER_LEAVE_CANCEL_REQUEST,
  USER_LEAVE_CANCEL_SUCCESS,
  USER_LEAVE_CANCEL_FAILURE
} from "../actions/userActionCreators";

const initialState = {
  data: null,
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

    case USER_CLOCK_REQUEST:
      return {
        ...state,
        isLoading: true,
        errors: initialState.errors
      };
    case USER_CLOCK_SUCCESS:
      return {
        ...state,
        isLoading: false
      };
    case USER_CLOCK_FAILURE:
      return {
        ...state,
        isLoading: false,
        errors: action.payload
      };

    case USER_CLOCK_CORRECTION_REQUEST_REQUEST:
      return {
        ...state,
        isLoading: true,
        errors: initialState.errors
      };
    case USER_CLOCK_CORRECTION_REQUEST_SUCCESS:
      return {
        ...state,
        isLoading: false
      };
    case USER_CLOCK_CORRECTION_REQUEST_FAILURE:
      return {
        ...state,
        isLoading: false,
        errors: action.payload
      };

    case USER_CLOCK_CORRECTION_REQUEST_CANCEL_REQUEST:
      return {
        ...state,
        isLoading: true,
        errors: initialState.errors
      };
    case USER_CLOCK_CORRECTION_REQUEST_CANCEL_SUCCESS:
      return {
        ...state,
        isLoading: false
      };
    case USER_CLOCK_CORRECTION_REQUEST_CANCEL_FAILURE:
      return {
        ...state,
        isLoading: false,
        errors: action.payload
      };

    case USER_SCHEDULE_UPDATE_REQUEST_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case USER_SCHEDULE_UPDATE_REQUEST_SUCCESS:
      return {
        ...state,
        isLoading: false
      };
    case USER_SCHEDULE_UPDATE_REQUEST_FAILURE:
      return {
        ...state,
        isLoading: false,
        errors: action.payload
      };

    case USER_SCHEDULE_UPDATE_REQUEST_CANCEL_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case USER_SCHEDULE_UPDATE_REQUEST_CANCEL_SUCCESS:
      return {
        ...state,
        isLoading: false
      };
    case USER_SCHEDULE_UPDATE_REQUEST_CANCEL_FAILURE:
      return {
        ...state,
        isLoading: false
      };

    case USER_LEAVE_REQUEST_REQUEST:
      return {
        ...state,
        isLoading: true,
        errors: initialState.errors
      };
    case USER_LEAVE_REQUEST_SUCCESS:
      return {
        ...state,
        isLoading: false
      };
    case USER_LEAVE_REQUEST_FAILURE:
      return {
        ...state,
        isLoading: false,
        errors: action.payload
      };

    case USER_LEAVE_REQUEST_CANCEL_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case USER_LEAVE_REQUEST_CANCEL_SUCCESS:
      return {
        ...state,
        isLoading: false
      };
    case USER_LEAVE_REQUEST_CANCEL_FAILURE:
      return {
        ...state,
        isLoading: false
      };

    case USER_LEAVE_CANCEL_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case USER_LEAVE_CANCEL_SUCCESS:
      return {
        ...state,
        isLoading: false
      };
    case USER_LEAVE_CANCEL_FAILURE:
      return {
        ...state,
        isLoading: false
      };

    default:
      return state;
  }
};
