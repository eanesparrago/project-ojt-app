import axios from "axios";

export const USER_GET_REQUEST = "USER_GET_REQUEST";
export const USER_GET_SUCCESS = "USER_GET_SUCCESS";
export const USER_GET_FAILURE = "USER_GET_FAILURE";

export const getCurrentUser = () => dispatch => {
  dispatch({
    type: USER_GET_REQUEST
  });

  axios
    .get("/api/users/current")
    .then(res => {
      dispatch({
        type: USER_GET_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: USER_GET_FAILURE,
        payload: err.response.data
      });
    });
};
