import axios from "axios";

import { setFlashMessage } from "./appActionCreators";

export const GROUPS_GET_REQUEST = "GROUPS_GET_REQUEST";
export const GROUPS_GET_SUCCESS = "GROUPS_GET_SUCCESS";
export const GROUPS_GET_FAILURE = "GROUPS_GET_FAILURE";

export const getGroups = () => dispatch => {
  dispatch({
    type: GROUPS_GET_REQUEST
  });

  axios
    .get("/api/groups")
    .then(res => {
      dispatch({
        type: GROUPS_GET_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GROUPS_GET_FAILURE,
        payload: err.response.data
      });
    });
};

export const GROUPS_CREATE_REQUEST = "GROUPS_CREATE_REQUEST";
export const GROUPS_CREATE_SUCCESS = "GROUPS_CREATE_SUCCESS";
export const GROUPS_CREATE_FAILURE = "GROUPS_CREATE_FAILURE";

export const createGroup = groupData => dispatch => {
  return new Promise(resolve => {
    dispatch({
      type: GROUPS_CREATE_REQUEST
    });

    axios
      .post("/api/groups", groupData)
      .then(res => {
        dispatch({
          type: GROUPS_CREATE_SUCCESS,
          payload: res.data
        });

        dispatch(
          setFlashMessage(
            `${res.data.name} was created successfully.`,
            "success"
          )
        );

        resolve();
      })
      .catch(err => {
        dispatch({
          type: GROUPS_CREATE_FAILURE,
          payload: err.response.data
        });

        dispatch(setFlashMessage("An error occurred.", "error"));
      });
  });
};

export const GROUPS_DELETE_REQUEST = "GROUPS_DELETE_REQUEST";
export const GROUPS_DELETE_SUCCESS = "GROUPS_DELETE_SUCCESS";
export const GROUPS_DELETE_FAILURE = "GROUPS_DELETE_FAILURE";

export const deleteGroup = groupId => dispatch => {
  return new Promise(resolve => {
    dispatch({
      type: GROUPS_DELETE_REQUEST
    });

    axios
      .delete(`/api/groups/${groupId}`)
      .then(res => {
        dispatch({
          type: GROUPS_DELETE_SUCCESS,
          payload: res.data.group
        });

        dispatch(
          setFlashMessage(
            `${res.data.group.name} was deleted successfully.`,
            "success"
          )
        );

        resolve();
      })
      .catch(err => {
        dispatch({
          type: GROUPS_DELETE_FAILURE,
          payload: err.response.data
        });

        dispatch(setFlashMessage("An error occurred", "error"));
      });
  });
};
