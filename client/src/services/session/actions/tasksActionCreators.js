import axios from "axios";

export const TASKS_OWN_GET_REQUEST = "TASKS_OWN_GET_REQUEST";
export const TASKS_OWN_GET_SUCCESS = "TASKS_OWN_GET_SUCCESS";
export const TASKS_OWN_GET_FAILURE = "TASKS_GET_FAILURE";

export const getOwnTasks = () => dispatch => {
  dispatch({
    type: TASKS_OWN_GET_REQUEST
  });

  axios
    .get("/api/tasks/own")
    .then(res => {
      dispatch({
        type: TASKS_OWN_GET_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: TASKS_OWN_GET_FAILURE,
        payload: err.reponse.data
      });
    });
};

export const TASKS_USER_GET_REQUEST = "TASKS_USER_GET_REQUEST";
export const TASKS_USER_GET_SUCCESS = "TASKS_USER_GET_SUCCESS";
export const TASKS_USER_GET_FAILURE = "TASKS_USER_GET_FAILURE";

export const getUserTasks = userId => dispatch => {
  dispatch({
    type: TASKS_USER_GET_REQUEST
  });

  axios
    .get(`/api/tasks?user=${userId}`)
    .then(res => {
      dispatch({
        type: TASKS_USER_GET_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: TASKS_USER_GET_FAILURE,
        payload: err.response.data
      });
    });
};

export const constantName = "constantName";
