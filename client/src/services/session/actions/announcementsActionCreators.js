import axios from "axios";

import { setFlashMessage } from "./appActionCreators";

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

export const ANNOUNCEMENT_GET_REQUEST = "ANNOUNCEMENT_GET_REQUEST";
export const ANNOUNCEMENT_GET_SUCCESS = "ANNOUNCEMENT_GET_SUCCESS";
export const ANNOUNCEMENT_GET_FAILURE = "ANNOUNCEMENT_GET_FAILURE";

export const getAnnouncement = id => dispatch => {
  dispatch({
    type: ANNOUNCEMENT_GET_REQUEST
  });

  axios
    .get(`/api/announcements/${id}`)
    .then(res => {
      dispatch({
        type: ANNOUNCEMENT_GET_SUCCESS,
        payload: res.data.announcement
      });
    })
    .catch(err => {
      dispatch({
        type: ANNOUNCEMENT_GET_FAILURE,
        payload: err.response.data
      });
    });
};

export const ANNOUNCEMENT_EDIT_REQUEST = "ANNOUNCEMENT_EDIT_REQUEST";
export const ANNOUNCEMENT_EDIT_SUCCESS = "ANNOUNCEMENT_EDIT_SUCCESS";
export const ANNOUNCEMENT_EDIT_FAILURE = "ANNOUNCEMENT_EDIT_FAILURE";

export const editAnnouncement = (id, message) => dispatch => {
  return new Promise((resolve, reject) => {
    dispatch({
      type: ANNOUNCEMENT_EDIT_REQUEST
    });

    axios
      .put(`/api/announcements/${id}`, message)
      .then(res => {
        dispatch({
          type: ANNOUNCEMENT_EDIT_SUCCESS,
          payload: res.data.announcement
        });

        dispatch(
          setFlashMessage("Announcement was edited successfully.", "success")
        );

        dispatch(getAnnouncement(id));
        dispatch(getAnnouncements());

        resolve();
      })
      .catch(err => {
        dispatch({
          type: ANNOUNCEMENT_EDIT_FAILURE,
          payload: err.response.data.errors
        });

        dispatch(setFlashMessage("An error occurred.", "error"));

        reject();
      });
  });
};

export const ANNOUNCEMENT_DELETE_REQUEST = "ANNOUNCEMENT_DELETE_REQUEST";
export const ANNOUNCEMENT_DELETE_SUCCESS = "ANNOUNCEMENT_DELETE_SUCCESS";
export const ANNOUNCEMENT_DELETE_FAILURE = "ANNOUNCEMENT_DELETE_FAILURE";

export const deleteAnnouncement = id => dispatch => {
  return new Promise((resolve, reject) => {
    dispatch({
      type: ANNOUNCEMENT_DELETE_REQUEST
    });

    axios
      .delete(`/api/announcements/${id}`)
      .then(res => {
        dispatch({
          type: ANNOUNCEMENT_DELETE_SUCCESS
        });

        dispatch(getAnnouncements());

        dispatch(
          setFlashMessage("Announcement was deleted successfully.", "success")
        );

        resolve();
      })
      .catch(err => {
        dispatch({
          type: ANNOUNCEMENT_DELETE_FAILURE,
          payload: err.response.data.errors
        });

        dispatch(setFlashMessage("An error occurred.", "error"));

        reject();
      });
  });
};
