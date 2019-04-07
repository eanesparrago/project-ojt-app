import axios from "axios";

import { setFlashMessage } from "./appActionCreators";

export const TASK_LOADING_SET = "TASK_LOADING_SET";
export const TASK_LOADING_UNSET = "TASK_LOADING_UNSET";
export const TASK_DATA_CLEAR = "TASK_DATA_CLEAR";
export const TASK_ERRORS_SET = "TASK_ERRORS_SET";
export const TASK_ERRORS_CLEAR = "TASK_ERRORS_CLEAR";

export const TASK_GET = "TASK_GET";
export const TASK_EDIT = "TASK_EDIT";

const setLoading = () => {
  return {
    type: TASK_LOADING_SET
  };
};

const unsetLoading = () => {
  return {
    type: TASK_LOADING_UNSET
  };
};

const clearData = () => {
  return {
    type: TASK_DATA_CLEAR
  };
};

const clearErrors = () => {
  return {
    type: TASK_ERRORS_CLEAR
  };
};

const handleRequest = () => dispatch => {
  dispatch(setLoading());
  dispatch(clearErrors());
};

const handleSuccess = (type, payload, message) => dispatch => {
  dispatch({
    type,
    payload
  });

  if (message) {
    dispatch(setFlashMessage(message, "success"));
  }

  dispatch(unsetLoading());
  dispatch(clearErrors());
};

const handleFailure = err => dispatch => {
  dispatch({
    type: TASK_ERRORS_SET,
    payload: err.response.data
  });
  dispatch(unsetLoading());
  dispatch(setFlashMessage("An error occured.", "error"));
};

export const getTask = taskId => dispatch => {
  dispatch(clearData());
  dispatch(handleRequest());

  axios
    .get(`/api/tasks/task/${taskId}`)
    .then(res => {
      dispatch(handleSuccess(TASK_GET, res.data));
    })
    .catch(err => {
      dispatch(handleFailure(err));
    });
};

export const editTask = (taskId, data) => dispatch => {
  return new Promise(resolve => {
    dispatch(handleRequest());

    axios
      .post(`/api/tasks/task/${taskId}`, data)
      .then(res => {
        dispatch(
          handleSuccess(TASK_EDIT, res.data, "Task edited successfully.")
        );

        resolve();
      })
      .catch(err => {
        dispatch(handleFailure(err));
      });
  });
};
