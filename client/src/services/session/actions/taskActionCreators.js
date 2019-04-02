import axios from "axios";

import { setFlashMessage } from "./appActionCreators";

export const TASK_CREATE_REQUEST = "TASK_CREATE_REQUEST";
export const TASK_CREATE_SUCCESS = "TASK_CREATE_SUCCESS";
export const TASK_CREATE_FAILURE = "TASK_CREATE_FAILURE";

export const createTask = data => dispatch => {
  return new Promise((resolve, reject) => {
    dispatch({
      type: TASK_CREATE_REQUEST
    });

    axios
      .post("/api/tasks", data)
      .then(res => {
        dispatch({
          type: TASK_CREATE_SUCCESS
        });

        dispatch(setFlashMessage("Task created successfully", "success"));

        resolve();
      })
      .catch(err => {
        dispatch({
          type: TASK_CREATE_FAILURE,
          payload: err.response.data
        });

        dispatch(setFlashMessage("An error occurred", "error"));

        reject();
      });
  });
};

export const TASK_ERRORS_CLEAR = "TASK_ERRORS_CLEAR";

export const clearErrors = () => ({
  type: TASK_ERRORS_CLEAR
});
