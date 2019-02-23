import {
  ADMIN_DEPARTMENTS_GET_REQUEST,
  ADMIN_DEPARTMENTS_GET_SUCCESS,
  ADMIN_DEPARTMENTS_GET_FAILURE,
  ADMIN_DEPARTMENTS_DEPARTMENT_CREATE_REQUEST,
  ADMIN_DEPARTMENTS_DEPARTMENT_CREATE_SUCCESS,
  ADMIN_DEPARTMENTS_DEPARTMENT_CREATE_FAILURE
} from "./departmentsActionCreators";

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case ADMIN_DEPARTMENTS_GET_SUCCESS:
      return action.payload;

    default:
      return state;
  }
};
