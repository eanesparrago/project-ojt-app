import {
  PERSON_GET_REQUEST,
  PERSON_GET_SUCCESS,
  PERSON_GET_FAILURE,
  PERSON_CREATE_REQUEST,
  PERSON_CREATE_SUCCESS,
  PERSON_CREATE_FAILURE,
  PERSON_CLOCK_EDIT_REQUEST,
  PERSON_CLOCK_EDIT_SUCCESS,
  PERSON_CLOCK_EDIT_FAILURE,
  PERSON_CLOCK_CORRECTION_REQUEST_APPROVE_REQUEST,
  PERSON_CLOCK_CORRECTION_REQUEST_APPROVE_SUCCESS,
  PERSON_CLOCK_CORRECTION_REQUEST_APPROVE_FAILURE,
  PERSON_CLOCK_CORRECTION_REQUEST_REJECT_REQUEST,
  PERSON_CLOCK_CORRECTION_REQUEST_REJECT_SUCCESS,
  PERSON_CLOCK_CORRECTION_REQUEST_REJECT_FAILURE
} from "../actions/personActionCreators";

const initialState = {
  data: null,
  isLoading: false,
  errors: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case PERSON_GET_REQUEST:
      return {
        ...state,
        isLoading: true,
        errors: initialState.errors,
        data: initialState.data
      };
    case PERSON_GET_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.payload
      };
    case PERSON_GET_FAILURE:
      return {
        ...state,
        isLoading: false,
        errors: action.payload
      };

    case PERSON_CREATE_REQUEST:
      return {
        ...state,
        isLoading: true,
        errors: initialState.errors
      };
    case PERSON_CREATE_SUCCESS:
      return {
        ...state,
        isLoading: false
      };
    case PERSON_CREATE_FAILURE:
      return {
        ...state,
        isLoading: false,
        errors: action.payload
      };

    case PERSON_CLOCK_EDIT_REQUEST:
      return {
        ...state,
        isLoading: true,
        errors: initialState.errors
      };
    case PERSON_CLOCK_EDIT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        errors: initialState.errors
      };
    case PERSON_CLOCK_EDIT_FAILURE:
      return {
        ...state,
        isLoading: false,
        errors: action.payload
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

    default:
      return state;
  }
};
