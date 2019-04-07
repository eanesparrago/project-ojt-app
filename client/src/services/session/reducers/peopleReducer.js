import {
  PEOPLE_LOADING_SET,
  PEOPLE_LOADING_UNSET,
  PEOPLE_GET,
  PEOPLE_CREATE,
  PEOPLE_DELETE
} from "../actions/peopleActionCreators";

import { PERSON_EDIT } from "../actions/personActionCreators";

const initialState = {
  data: null,
  isLoading: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    // >>> PEOPLE
    case PEOPLE_LOADING_SET:
      return {
        ...state,
        isLoading: true
      };

    case PEOPLE_LOADING_UNSET:
      return {
        ...state,
        isLoading: false
      };

    case PEOPLE_GET:
      return {
        ...state,
        isLoading: false,
        data: action.payload
      };

    // case PEOPLE_CREATE:
    //   return {
    //     ...state,
    //     isLoading: false,
    //     data: [...state.data, action.payload]
    //   };

    // case PEOPLE_DELETE:
    //   return {
    //     ...state,
    //     isLoading: false,
    //     data: state.data.filter(person => person._id !== action.payload._id)
    //   };

    // >>> PERSON
    // case PERSON_EDIT:
    //   return {
    //     ...state,
    //     data: state.data.map(person =>
    //       person._id === action.payload._id ? action.payload : person
    //     )
    //   };

    default:
      return state;
  }
};
