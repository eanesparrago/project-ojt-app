import axios from "axios";

export const GROUP_GET_REQUEST = "GROUP_GET_REQUEST";
export const GROUP_GET_SUCCESS = "GROUP_GET_SUCCESS";
export const GROUP_GET_FAILURE = "GROUP_GET_FAILURE";

export const getOwnGroup = () => dispatch => {
  dispatch({
    type: GROUP_GET_REQUEST
  });

  axios
    .get("/api/groups/own")
    .then(res => {
      dispatch({
        type: GROUP_GET_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GROUP_GET_FAILURE,
        payload: err.response.data
      });
    });
};
