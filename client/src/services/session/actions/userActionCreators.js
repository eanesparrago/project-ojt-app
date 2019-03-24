import axios from "axios";

export const USER_GET_REQUEST = "USER_GET_REQUEST";
export const USER_GET_SUCCESS = "USER_GET_SUCCESS";
export const USER_GET_FAILURE = "USER_GET_FAILURE";

export const USER_CLOCK_REQUEST = "USER_CLOCK_REQUEST";
export const USER_CLOCK_SUCCESS = "USER_CLOCK_SUCCESS";
export const USER_CLOCK_FAILURE = "USER_CLOCK_FAILURE";

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

export const clockTrainee = () => dispatch => {
  dispatch({
    type: USER_CLOCK_REQUEST
  });

  axios
    .post("/api/trainee/clock")
    .then(res => {
      dispatch({
        type: USER_CLOCK_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: USER_CLOCK_FAILURE,
        payload: err.response.data
      });
    });
};
