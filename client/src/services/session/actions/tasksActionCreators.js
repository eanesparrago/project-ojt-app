import axios from "axios";

import { setFlashMessage } from "./appActionCreators";

export const TASKS_LOADING_SET = "TASKS_LOADING_SET";
export const TASKS_LOADING_UNSET = "TASKS_LOADING_UNSET";
export const TASKS_ERRORS_SET = "TASKS_ERRORS_SET";
export const TASKS_ERRORS_CLEAR = "TASKS_ERRORS_CLEAR";

export const TASKS_GET = "TASKS_GET";
export const TASKS_CREATE = "TASKS_CREATE";
export const TASKS_DELETE = "TASKS_DELETE";

const setLoading = () => {
  return {
    type: TASKS_LOADING_SET
  };
};

const unsetLoading = () => {
  return {
    type: TASKS_LOADING_UNSET
  };
};

export const clearErrors = () => {
  return {
    type: TASKS_ERRORS_CLEAR
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
    type: TASKS_ERRORS_SET,
    payload: err.response.data
  });
  dispatch(unsetLoading());
  dispatch(setFlashMessage("An error occurred.", "error"));
};

export const getUserTasks = userId => dispatch => {
  dispatch(handleRequest());

  axios
    .get(`/api/tasks?user=${userId}`)
    .then(res => {
      dispatch(handleSuccess(TASKS_GET, res.data));
    })
    .catch(err => {
      dispatch(handleFailure(err));
    });
};

export const getOwnTasks = () => dispatch => {
  dispatch(handleRequest());

  axios
    .get("/api/tasks/own")
    .then(res => {
      dispatch(handleSuccess(TASKS_GET, res.data));
    })
    .catch(err => {
      dispatch(handleFailure(err));
    });
};

export const createTask = data => dispatch => {
  return new Promise(resolve => {
    dispatch(handleRequest());

    axios
      .post("/api/tasks", data)
      .then(res => {
        dispatch(
          handleSuccess(
            TASKS_CREATE,
            res.data.task,
            "Task created successfully."
          )
        );
        resolve();
      })
      .catch(err => {
        dispatch(handleFailure(err));
      });
  });
};

export const deleteTask = taskId => dispatch => {
  return new Promise(resolve => {
    dispatch(handleRequest());

    axios
      .delete(`/api/tasks/task/${taskId}`)
      .then(res => {
        dispatch(
          handleSuccess(TASKS_DELETE, res.data.task, "Task deleted successfully.")
        );
        resolve();
      })
      .catch(err => {
        dispatch(handleFailure(err));
      });
  });
};
