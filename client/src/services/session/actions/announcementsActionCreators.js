import axios from "axios";

export const ANNOUNCEMENTS_GET_REQUEST = "ANNOUNCEMENTS_GET_REQUEST";
export const ANNOUNCEMENTS_GET_SUCCESS = "ANNOUNCEMENTS_GET_SUCCESS";
export const ANNOUNCEMENTS_GET_FAILURE = "ANNOUNCEMENTS_GET_FAILURE";

export const getAnnouncements = () => dispatch => {
  dispatch({
    type: ANNOUNCEMENTS_GET_REQUEST
  });

  axios
    .get("/api/announcements")
    .then(res => {
      dispatch({
        type: ANNOUNCEMENTS_GET_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: ANNOUNCEMENTS_GET_FAILURE,
        payload: err.response.data
      });
    });
};
