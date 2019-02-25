import {
  ADMIN_GROUPS_GET_REQUEST,
  ADMIN_GROUPS_GET_SUCCESS,
  ADMIN_GROUPS_GET_FAILURE,
  ADMIN_GROUPS_GROUP_CREATE_REQUEST,
  ADMIN_GROUPS_GROUP_CREATE_SUCCESS,
  ADMIN_GROUPS_GROUP_CREATE_FAILURE
} from "./groupsActionCreators";

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case ADMIN_GROUPS_GET_SUCCESS:
      return action.payload;

    default:
      return state;
  }
};
