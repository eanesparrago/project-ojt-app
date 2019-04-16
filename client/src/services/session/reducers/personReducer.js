import {
  PERSON_LOADING_SET,
  PERSON_LOADING_UNSET,
  PERSON_DATA_CLEAR,
  PERSON_GET,
  PERSON_EDIT,
  PERSON_SCHEDULE_EDIT,
  PERSON_PASSWORD_CHANGE,
  PERSON_CLOCK_EDIT,
  PERSON_CLOCK_EDIT_REQUEST,
  PERSON_CLOCK_EDIT_SUCCESS,
  PERSON_CLOCK_EDIT_FAILURE,
  PERSON_CLOCK_CORRECTION_REQUEST_APPROVE_REQUEST,
  PERSON_CLOCK_CORRECTION_REQUEST_APPROVE_SUCCESS,
  PERSON_CLOCK_CORRECTION_REQUEST_APPROVE_FAILURE,
  PERSON_CLOCK_CORRECTION_REQUEST_REJECT_REQUEST,
  PERSON_CLOCK_CORRECTION_REQUEST_REJECT_SUCCESS,
  PERSON_CLOCK_CORRECTION_REQUEST_REJECT_FAILURE,
  PERSON_SCHEDULE_UPDATE_REQUEST_APPROVE_REQUEST,
  PERSON_SCHEDULE_UPDATE_REQUEST_APPROVE_SUCCESS,
  PERSON_SCHEDULE_UPDATE_REQUEST_APPROVE_FAILURE,
  PERSON_LEAVE_REQUEST_APPROVE_REQUEST,
  PERSON_LEAVE_REQUEST_APPROVE_SUCCESS,
  PERSON_LEAVE_REQUEST_APPROVE_FAILURE,
  PERSON_LEAVE_REQUEST_REJECT_REQUEST,
  PERSON_LEAVE_REQUEST_REJECT_SUCCESS,
  PERSON_LEAVE_REQUEST_REJECT_FAILURE
} from "../actions/personActionCreators";

const initialState = {
  data: null,
  isLoading: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case PERSON_LOADING_SET:
      return {
        ...state,
        isLoading: true
      };

    case PERSON_LOADING_UNSET:
      return {
        ...state,
        isLoading: false
      };

    case PERSON_DATA_CLEAR:
      return {
        ...state,
        data: initialState.data
      };

    case PERSON_GET:
      return {
        ...state,
        isLoading: false,
        data: action.payload
      };

    case PERSON_EDIT:
      return {
        ...state,
        isLoading: false,
        data: action.payload
      };

    case PERSON_SCHEDULE_EDIT:
      return {
        ...state,
        isLoading: false,
        data: action.payload
      };

    case PERSON_PASSWORD_CHANGE:
      return {
        ...state,
        isLoading: false
      };

    case PERSON_CLOCK_EDIT:
      return {
        ...state,
        isLoading: false,
        data: action.payload
      };

    case PERSON_CLOCK_CORRECTION_REQUEST_APPROVE_REQUEST:
      return {
        ...state,
        isLoading: true,
        errors: initialState.errors
      };
    case PERSON_CLOCK_CORRECTION_REQUEST_APPROVE_SUCCESS:
      return {
        ...state,
        isLoading: false
      };
    case PERSON_CLOCK_CORRECTION_REQUEST_APPROVE_FAILURE:
      return {
        ...state,
        isLoading: false,
        errors: action.payload
      };

    case PERSON_CLOCK_CORRECTION_REQUEST_REJECT_REQUEST:
      return {
        ...state,
        isLoading: true,
        errors: action.payload
      };
    case PERSON_CLOCK_CORRECTION_REQUEST_REJECT_SUCCESS:
      return {
        ...state,
        isLoading: false
      };
    case PERSON_CLOCK_CORRECTION_REQUEST_REJECT_FAILURE:
      return {
        ...state,
        isLoading: false,
        errors: action.payload
      };

    case PERSON_SCHEDULE_UPDATE_REQUEST_APPROVE_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case PERSON_SCHEDULE_UPDATE_REQUEST_APPROVE_SUCCESS:
      return {
        ...state,
        isLoading: false
      };
    case PERSON_SCHEDULE_UPDATE_REQUEST_APPROVE_FAILURE:
      return {
        ...state,
        isLoading: false
      };

    case PERSON_LEAVE_REQUEST_APPROVE_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case PERSON_LEAVE_REQUEST_APPROVE_SUCCESS:
      return {
        ...state,
        isLoading: false
      };
    case PERSON_LEAVE_REQUEST_APPROVE_FAILURE:
      return {
        ...state,
        isLoading: false
      };

    case PERSON_LEAVE_REQUEST_REJECT_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case PERSON_LEAVE_REQUEST_REJECT_SUCCESS:
      return {
        ...state,
        isLoading: false
      };
    case PERSON_LEAVE_REQUEST_REJECT_FAILURE:
      return {
        ...state,
        isLoading: false
      };

    default:
      return state;
  }
};
