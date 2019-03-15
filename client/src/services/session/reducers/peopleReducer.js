import {
  ADMIN_PEOPLE_GET_REQUEST,
  ADMIN_PEOPLE_GET_SUCCESS,
  ADMIN_PEOPLE_GET_FAILURE
} from "../actions/peopleActionCreators";

const initialState = {
  data: null,
  isLoading: false,
  person: {},
  errors: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADMIN_PEOPLE_GET_REQUEST:
      return { ...state, isLoading: true, data: initialState.data };
    case ADMIN_PEOPLE_GET_SUCCESS:
      return { ...state, data: action.payload, isLoading: false };
    case ADMIN_PEOPLE_GET_FAILURE:
      return { ...state, isLoading: false, errors: action.payload };

    default:
      return state;
  }
};
