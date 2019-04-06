import {
  PEOPLE_GET_REQUEST,
  PEOPLE_GET_SUCCESS,
  PEOPLE_GET_FAILURE
} from "../actions/peopleActionCreators";

import {
  PERSON_CREATE_SUCCESS,
  PERSON_EDIT_SUCCESS
} from "../actions/personActionCreators";

const initialState = {
  data: null,
  isLoading: false,
  errors: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case PEOPLE_GET_REQUEST:
      return { ...state, isLoading: true, data: initialState.data };
    case PEOPLE_GET_SUCCESS:
      return { ...state, data: action.payload, isLoading: false };
    case PEOPLE_GET_FAILURE:
      return { ...state, isLoading: false, errors: action.payload };

    case PERSON_CREATE_SUCCESS:
      return {
        ...state,
        data: [...state.data, action.payload]
      };

    case PERSON_EDIT_SUCCESS:
      return {
        ...state,
        data: state.data.map(person =>
          person._id === action.payload._id ? action.payload : person
        )
      };

    default:
      return state;
  }
};
