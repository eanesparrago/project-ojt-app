import {
  ADMIN_GROUPS_GET_REQUEST,
  ADMIN_GROUPS_GET_SUCCESS,
  ADMIN_GROUPS_GET_FAILURE,
  ADMIN_GROUPS_GROUP_CREATE_REQUEST,
  ADMIN_GROUPS_GROUP_CREATE_SUCCESS,
  ADMIN_GROUPS_GROUP_CREATE_FAILURE
} from "./groupsActionCreators";

const initialState = {
  data: [],
  isLoading: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADMIN_GROUPS_GET_REQUEST:
      return { ...state, isLoading: true };

    case ADMIN_GROUPS_GET_SUCCESS:
      return { ...state, data: action.payload, isLoading: false };

    case ADMIN_GROUPS_GET_FAILURE:
      return { ...state, isLoading: false };

    default:
      return state;
  }
};
