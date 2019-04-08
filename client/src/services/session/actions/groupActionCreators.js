import axios from "axios";

import { setFlashMessage } from "./appActionCreators";

export const GROUP_OWN_GET_REQUEST = "GROUP_OWN_GET_REQUEST";
export const GROUP_OWN_GET_SUCCESS = "GROUP_OWN_GET_SUCCESS";
export const GROUP_OWN_GET_FAILURE = "GROUP_OWN_GET_FAILURE";

export const getOwnGroup = () => dispatch => {
  dispatch({
    type: GROUP_OWN_GET_REQUEST
  });

  axios
    .get("/api/groups/own")
    .then(res => {
      dispatch({
        type: GROUP_OWN_GET_SUCCESS,
        payload: res.data.group
      });
    })
    .catch(err => {
      dispatch({
        type: GROUP_OWN_GET_FAILURE,
        payload: err.response.data
      });
    });
};

export const GROUP_GET_REQUEST = "GROUP_GET_REQUEST";
export const GROUP_GET_SUCCESS = "GROUP_GET_SUCCESS";
export const GROUP_GET_FAILURE = "GROUP_GET_FAILURE";

export const getGroup = groupId => dispatch => {
  dispatch({
    type: GROUP_GET_REQUEST
  });

  axios
    .get(`/api/groups/group/${groupId}`)
    .then(res => {
      dispatch({
        type: GROUP_GET_SUCCESS,
        payload: res.data.group
      });
    })
    .catch(err => {
      dispatch({
        type: GROUP_GET_FAILURE,
        payload: err.response.data
      });
    });
};

export const GROUP_EDIT_REQUEST = "GROUP_EDIT_REQUEST";
export const GROUP_EDIT_SUCCESS = "GROUP_EDIT_SUCCESS";
export const GROUP_EDIT_FAILURE = "GROUP_EDIT_FAILURE";

export const editGroup = (groupId, data) => dispatch => {
  return new Promise(resolve => {
    dispatch({
      type: GROUP_EDIT_REQUEST
    });

    axios
      .put(`/api/groups/${groupId}`, data)
      .then(res => {
        dispatch({
          type: GROUP_EDIT_SUCCESS,
          payload: res.data.group
        });

        dispatch(
          setFlashMessage(
            `${res.data.group.name} was edited successfully.`,
            "success"
          )
        );

        resolve();
      })
      .catch(err => {
        dispatch({
          type: GROUP_EDIT_FAILURE,
          payload: err.response.data
        });

        dispatch(setFlashMessage("An error occurred,", "error"));
      });
  });
};
