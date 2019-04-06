import axios from "axios";
import { setFlashMessage } from "./appActionCreators";

export const PERSON_GET_REQUEST = "PERSON_GET_REQUEST";
export const PERSON_GET_SUCCESS = "PERSON_GET_SUCCESS";
export const PERSON_GET_FAILURE = "PERSON_GET_FAILURE";

export const getPerson = id => dispatch => {
  dispatch({
    type: PERSON_GET_REQUEST
  });

  axios
    .get(`/api/users/user/${id}`)
    .then(res => {
      dispatch({
        type: PERSON_GET_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: PERSON_GET_FAILURE,
        payload: err.response.data
      });
    });
};

export const PERSON_CREATE_REQUEST = "PERSON_CREATE_REQUEST";
export const PERSON_CREATE_SUCCESS = "PERSON_CREATE_SUCCESS";
export const PERSON_CREATE_FAILURE = "PERSON_CREATE_FAILURE";

export const createPerson = data => dispatch => {
  return new Promise((resolve, reject) => {
    dispatch({
      type: PERSON_CREATE_REQUEST
    });

    axios
      .post("/api/users/register", data)
      .then(res => {
        dispatch({
          type: PERSON_CREATE_SUCCESS,
          payload: res.data.user
        });

        dispatch(setFlashMessage("User created successfully.", "success"));

        resolve();
      })
      .catch(err => {
        dispatch({
          type: PERSON_CREATE_FAILURE,
          payload: err.response.data
        });

        dispatch(setFlashMessage("An error occurred.", "error"));

        reject();
      });
  });
};

export const PERSON_EDIT_REQUEST = "PERSON_EDIT_REQUEST";
export const PERSON_EDIT_SUCCESS = "PERSON_EDIT_SUCCESS";
export const PERSON_EDIT_FAILURE = "PERSON_EDIT_FAILURE";

export const editPerson = data => dispatch => {
  return new Promise((resolve, reject) => {
    dispatch({
      type: PERSON_EDIT_REQUEST
    });

    axios
      .put(`/api/users/${data.id}`, data)
      .then(res => {
        dispatch({
          type: PERSON_EDIT_SUCCESS,
          payload: res.data.user
        });

        dispatch(setFlashMessage("User edited successfully.", "success"));

        resolve();
      })
      .catch(err => {
        dispatch({
          type: PERSON_EDIT_FAILURE,
          payload: err.response.data
        });

        dispatch(setFlashMessage("An error occurred,", "error"));

        reject();
      });
  });
};

export const PERSON_CLOCK_EDIT_REQUEST = "PERSON_CLOCK_EDIT_REQUEST";
export const PERSON_CLOCK_EDIT_SUCCESS = "PERSON_CLOCK_EDIT_SUCCESS";
export const PERSON_CLOCK_EDIT_FAILURE = "PERSON_CLOCK_EDIT_FAILURE";

export const editClock = data => dispatch => {
  dispatch({
    type: PERSON_CLOCK_EDIT_REQUEST
  });

  axios
    .post(`/api/clocks/${data.clockId}`, data.clock)
    .then(res => {
      dispatch({
        type: PERSON_CLOCK_EDIT_SUCCESS,
        payload: res.data.user
      });

      dispatch(setFlashMessage("Updated clock successfully", "success"));
      dispatch(getPerson(data.userId));
    })
    .catch(err => {
      dispatch({
        type: PERSON_CLOCK_EDIT_FAILURE,
        payload: err.response.data
      });

      dispatch(setFlashMessage("An error occurred", "error"));
    });
};

export const PERSON_CLOCK_CORRECTION_REQUEST_APPROVE_REQUEST =
  "PERSON_CLOCK_CORRECTION_REQUEST_APPROVE_REQUEST";
export const PERSON_CLOCK_CORRECTION_REQUEST_APPROVE_SUCCESS =
  "PERSON_CLOCK_CORRECTION_REQUEST_APPROVE_SUCCESS";
export const PERSON_CLOCK_CORRECTION_REQUEST_APPROVE_FAILURE =
  "PERSON_CLOCK_CORRECTION_REQUEST_APPROVE_FAILURE";

// >>> data: { userId }
export const approveClockCorrectionRequest = data => dispatch => {
  dispatch({
    type: PERSON_CLOCK_CORRECTION_REQUEST_APPROVE_REQUEST
  });

  axios
    .post("/api/trainee/approve-clock-correction", data)
    .then(res => {
      dispatch({
        type: PERSON_CLOCK_CORRECTION_REQUEST_APPROVE_SUCCESS
      });

      dispatch(getPerson(data.userId));
      dispatch(
        setFlashMessage("Clock request approved successfully", "success")
      );
    })
    .catch(err => {
      dispatch({
        type: PERSON_CLOCK_CORRECTION_REQUEST_APPROVE_FAILURE,
        payload: err.reposnse.data
      });

      dispatch(setFlashMessage("An error occurred", "error"));
    });
};

export const PERSON_CLOCK_CORRECTION_REQUEST_REJECT_REQUEST =
  "PERSON_CLOCK_CORRECTION_REQUEST_REJECT_REQUEST";
export const PERSON_CLOCK_CORRECTION_REQUEST_REJECT_SUCCESS =
  "PERSON_CLOCK_CORRECTION_REQUEST_REJECT_SUCCESS";
export const PERSON_CLOCK_CORRECTION_REQUEST_REJECT_FAILURE =
  "PERSON_CLOCK_CORRECTION_REQUEST_REJECT_FAILURE";
export const rejectClockCorrectionRequest = data => dispatch => {
  dispatch({
    type: PERSON_CLOCK_CORRECTION_REQUEST_REJECT_REQUEST
  });

  axios
    .post("/api/trainee/reject-clock-correction", data)
    .then(res => {
      dispatch({
        type: PERSON_CLOCK_CORRECTION_REQUEST_APPROVE_SUCCESS
      });

      dispatch(getPerson(data.userId));
      dispatch(
        setFlashMessage("Clock request rejected successfully", "success")
      );
    })
    .catch(err => {
      dispatch({
        type: PERSON_CLOCK_CORRECTION_REQUEST_APPROVE_FAILURE,
        payload: err.reposnse.data
      });

      dispatch(setFlashMessage("An error occurred", "error"));
    });
};
