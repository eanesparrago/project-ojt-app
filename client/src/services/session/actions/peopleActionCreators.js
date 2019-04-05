import axios from "axios";

export const PEOPLE_GET_REQUEST = "PEOPLE_GET_REQUEST";
export const PEOPLE_GET_SUCCESS = "PEOPLE_GET_SUCCESS";
export const PEOPLE_GET_FAILURE = "PEOPLE_GET_FAILURE";

export const getPeople = () => dispatch => {
  dispatch({
    type: PEOPLE_GET_REQUEST
  });

  axios
    .get("/api/users")
    .then(res => {
      dispatch({
        type: PEOPLE_GET_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: PEOPLE_GET_FAILURE,
        payload: err.response.data
      });
    });
};
