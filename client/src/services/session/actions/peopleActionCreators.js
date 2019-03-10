import axios from "axios";

export const ADMIN_PEOPLE_GET_REQUEST = "ADMIN_PEOPLE_GET_REQUEST";
export const ADMIN_PEOPLE_GET_SUCCESS = "ADMIN_PEOPLE_GET_SUCCESS";
export const ADMIN_PEOPLE_GET_FAILURE = "ADMIN_PEOPLE_GET_FAILURE";

export const getPeople = () => dispatch => {
  dispatch({
    type: ADMIN_PEOPLE_GET_REQUEST
  });

  axios
    .get("/api/users")
    .then(res => {
      dispatch({
        type: ADMIN_PEOPLE_GET_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: ADMIN_PEOPLE_GET_FAILURE,
        payload: err.response.data
      });
    });
};
