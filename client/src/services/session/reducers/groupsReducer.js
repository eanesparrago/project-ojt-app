import {
  ADMIN_GROUPS_GET_REQUEST,
  ADMIN_GROUPS_GET_SUCCESS,
  ADMIN_GROUPS_GET_FAILURE,
  ADMIN_GROUPS_GET_GROUP_REQUEST,
  ADMIN_GROUPS_GET_GROUP_SUCCESS,
  ADMIN_GROUPS_GET_GROUP_FAILURE
} from "../actions/groupsActionCreators";

const initialState = {
  data: null,
  isLoading: false,
  group: {
    users: []
  },
  errors: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADMIN_GROUPS_GET_REQUEST:
      return { ...state, isLoading: true, data: initialState.data };
    case ADMIN_GROUPS_GET_SUCCESS:
      return { ...state, data: action.payload, isLoading: false };
    case ADMIN_GROUPS_GET_FAILURE:
      return { ...state, isLoading: false };

    case ADMIN_GROUPS_GET_GROUP_REQUEST:
      return { ...state, isLoading: true, group: initialState.group };
    case ADMIN_GROUPS_GET_GROUP_SUCCESS:
      return { ...state, isLoading: false, group: action.payload };
    case ADMIN_GROUPS_GET_GROUP_FAILURE:
      return {
        ...state,
        isLoading: false,
        errors: action.payload,
        group: initialState.group
      };

    default:
      return state;
  }
};
