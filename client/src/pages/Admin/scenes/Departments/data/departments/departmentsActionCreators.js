import axios from "axios";

export const ADMIN_DEPARTMENTS_GET_REQUEST = "ADMIN_DEPARTMENTS_GET_REQUEST";
export const ADMIN_DEPARTMENTS_GET_SUCCESS = "ADMIN_DEPARTMENTS_GET_SUCCESS";
export const ADMIN_DEPARTMENTS_GET_FAILURE = "ADMIN_DEPARTMENTS_GET_FAILURE";

export const ADMIN_DEPARTMENTS_DEPARTMENT_CREATE_REQUEST =
  "ADMIN_DEPARTMENTS_DEPARTMENT_CREATE_REQUEST";
export const ADMIN_DEPARTMENTS_DEPARTMENT_CREATE_SUCCESS =
  "ADMIN_DEPARTMENTS_DEPARTMENT_CREATE_SUCCESS";
export const ADMIN_DEPARTMENTS_DEPARTMENT_CREATE_FAILURE =
  "ADMIN_DEPARTMENTS_DEPARTMENT_CREATE_FAILURE";

export const getDepartments = () => dispatch => {
  dispatch({
    type: ADMIN_DEPARTMENTS_GET_REQUEST
  });

  axios
    .get("/api/departments")
    .then(res => {
      dispatch({
        type: ADMIN_DEPARTMENTS_GET_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: ADMIN_DEPARTMENTS_GET_FAILURE,
        payload: err.response.data
      });
    });
};

export const createDepartment = departmentData => dispatch => {
  dispatch({
    type: ADMIN_DEPARTMENTS_DEPARTMENT_CREATE_REQUEST
  });

  axios
    .post("/api/departments", departmentData)
    .then(res => {
      dispatch({
        type: ADMIN_DEPARTMENTS_DEPARTMENT_CREATE_SUCCESS,
        payload: res.data
      });

      dispatch(getDepartments());
    })
    .catch(err => {
      dispatch({
        type: ADMIN_DEPARTMENTS_DEPARTMENT_CREATE_FAILURE,
        payload: err.response.data
      });
    });
};
