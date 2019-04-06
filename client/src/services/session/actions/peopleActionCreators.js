import axios from "axios";

import { ERRORS_SET } from "./errorsActionCreators";
import { setFlashMessage } from "./appActionCreators";

export const PEOPLE_LOADING_SET = "PEOPLE_LOADING_SET";
export const PEOPLE_LOADING_UNSET = "PEOPLE_LOADING_UNSET";

export const PEOPLE_GET = "PEOPLE_GET";
export const PEOPLE_CREATE = "PEOPLE_CREATE";
export const PEOPLE_DELETE = "PEOPLE_DELETE";

const setPeopleLoading = () => {
  return {
    type: PEOPLE_LOADING_SET
  };
};

const unsetPeopleLoading = () => {
  return {
    type: PEOPLE_LOADING_UNSET
  };
};

const handleError = err => dispatch => {
  dispatch({
    type: ERRORS_SET,
    payload: err.response.data
  });

  dispatch(unsetPeopleLoading());
  dispatch(setFlashMessage("An error occurred.", "error"));
};

export const getPeople = () => dispatch => {
  dispatch(setPeopleLoading());

  axios
    .get("/api/users")
    .then(res => {
      dispatch({
        type: PEOPLE_GET,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch(handleError());
    });
};

export const createPerson = data => dispatch => {
  return new Promise(resolve => {
    dispatch(setPeopleLoading());

    setTimeout(() => {
      axios
        .post("/api/users/register", data)
        .then(res => {
          dispatch({
            type: PEOPLE_CREATE,
            payload: res.data.user
          });

          dispatch(setFlashMessage("User created successfully.", "success"));

          resolve();
        })
        .catch(err => {
          dispatch(handleError(err));
        });
    }, 1000);
  });
};

export const deletePerson = userId => dispatch => {
  return new Promise(resolve => {
    dispatch(setPeopleLoading());

    axios
      .delete(`/api/users/${userId}`)
      .then(res => {
        dispatch({
          type: PEOPLE_DELETE,
          payload: res.data
        });

        resolve();
      })
      .catch(err => {
        dispatch(handleError(err));
      });
  });
};
