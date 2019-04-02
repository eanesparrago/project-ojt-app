import axios from "axios";

import { setFlashMessage } from "./appActionCreators";
import { getOwnTasks } from "./tasksActionCreators";

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
        dispatch(getOwnTasks());

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

export const TASK_GET_REQUEST = "TASK_GET_REQUEST";
export const TASK_GET_SUCCESS = "TASK_GET_SUCCESS";
export const TASK_GET_FAILURE = "TASK_GET_FAILURE";

export const getTask = taskId => dispatch => {
  dispatch({
    type: TASK_GET_REQUEST
  });

  axios
    .get(`/api/tasks/task/${taskId}`)
    .then(res => {
      dispatch({
        type: TASK_GET_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: TASK_GET_FAILURE,
        payload: err.response.data
      });
    });
};

export const TASK_EDIT_REQUEST = "TASK_EDIT_REQUEST";
export const TASK_EDIT_SUCCESS = "TASK_EDIT_SUCCESS";
export const TASK_EDIT_FAILURE = "TASK_EDIT_FAILURE";

export const editTask = (taskId, data) => dispatch => {
  return new Promise((resolve, reject) => {
    dispatch({
      type: TASK_EDIT_REQUEST
    });

    axios
      .post(`/api/tasks/task/${taskId}`, data)
      .then(res => {
        dispatch({
          type: TASK_EDIT_SUCCESS,
          payload: res.data
        });

        dispatch(getTask(taskId));

        dispatch(setFlashMessage("Task edited successfully", "success"));

        dispatch(getOwnTasks());

        resolve();
      })
      .catch(err => {
        dispatch({
          type: TASK_EDIT_FAILURE,
          payload: err.response.data
        });

        dispatch(setFlashMessage("An error occurred", "error"));

        reject();
      });
  });
};

export const TASK_DELETE_REQUEST = "TASK_DELETE_REQUEST";
export const TASK_DELETE_SUCCESS = "TASK_DELETE_SUCCESS";
export const TASK_DELETE_FAILURE = "TASK_DELETE_FAILURE";

export const deleteTask = taskId => dispatch => {
  return new Promise((resolve, reject) => {
    dispatch({
      type: TASK_DELETE_REQUEST
    });

    axios
      .delete(`/api/tasks/task/${taskId}`)
      .then(res => {
        dispatch({
          type: TASK_DELETE_SUCCESS
        });

        dispatch(setFlashMessage("Task deleted successfully", "success"));

        dispatch(getOwnTasks());

        resolve();
      })
      .catch(err => {
        dispatch({
          type: TASK_DELETE_FAILURE,
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
