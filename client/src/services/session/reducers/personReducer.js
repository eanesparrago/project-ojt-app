import {
  PEOPLE_PERSON_GET_REQUEST,
  PEOPLE_PERSON_GET_SUCCESS,
  PEOPLE_PERSON_GET_FAILURE,
  PERSON_CLOCK_EDIT_REQUEST,
  PERSON_CLOCK_EDIT_SUCCESS,
  PERSON_CLOCK_EDIT_FAILURE
} from "../actions/personActionCreators";

const initialState = {
  data: null,
  isLoading: false,
  errors: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case PEOPLE_PERSON_GET_REQUEST:
      return {
        ...state,
        isLoading: true,
        errors: initialState.errors,
        data: initialState.data
      };
    case PEOPLE_PERSON_GET_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.payload
      };
    case PEOPLE_PERSON_GET_FAILURE:
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

    default:
      return state;
  }
};
