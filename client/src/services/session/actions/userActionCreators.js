import axios from "axios";

import { setFlashMessage } from "./appActionCreators";

export const USER_GET_REQUEST = "USER_GET_REQUEST";
export const USER_GET_SUCCESS = "USER_GET_SUCCESS";
export const USER_GET_FAILURE = "USER_GET_FAILURE";

export const getCurrentUser = () => dispatch => {
  dispatch({
    type: USER_GET_REQUEST
  });

  axios
    .get("/api/users/current")
    .then(res => {
      dispatch({
        type: USER_GET_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: USER_GET_FAILURE,
        payload: err.response.data
      });
    });
};

export const USER_CLOCK_REQUEST = "USER_CLOCK_REQUEST";
export const USER_CLOCK_SUCCESS = "USER_CLOCK_SUCCESS";
export const USER_CLOCK_FAILURE = "USER_CLOCK_FAILURE";

export const clockTrainee = data => dispatch => {
  dispatch({
    type: USER_CLOCK_REQUEST
  });

  axios
    .post("/api/trainee/clock", data)
    .then(res => {
      dispatch({
        type: USER_CLOCK_SUCCESS,
        payload: res.data
      });

      dispatch(setFlashMessage("Clocked successfully.", "success"));
    })
    .catch(err => {
      dispatch({
        type: USER_CLOCK_FAILURE
        // payload: err.response.data
      });

      dispatch(setFlashMessage("An error occurred.", "error"));
    });
};

export const USER_CLOCK_CORRECTION_REQUEST_REQUEST =
  "USER_CLOCK_CORRECTION_REQUEST_REQUEST";
export const USER_CLOCK_CORRECTION_REQUEST_SUCCESS =
  "USER_CLOCK_CORRECTION_REQUEST_SUCCESS";
export const USER_CLOCK_CORRECTION_REQUEST_FAILURE =
  "USER_CLOCK_CORRECTION_REQUEST_FAILURE";

// >>> data: { in, out, clockId }
export const requestClockCorrection = data => dispatch => {
  return new Promise((resolve, reject) => {
    dispatch({
      type: USER_CLOCK_CORRECTION_REQUEST_REQUEST
    });

    axios
      .post("/api/trainee/clock-correction", data)
      .then(res => {
        dispatch({
          type: USER_CLOCK_CORRECTION_REQUEST_SUCCESS
        });

        dispatch(getCurrentUser());

        dispatch(
          setFlashMessage(
            "Clock correction request submitted successfully",
            "success"
          )
        );

        resolve();
      })
      .catch(err => {
        dispatch({
          type: USER_CLOCK_CORRECTION_REQUEST_FAILURE,
          payload: err.response.data
        });

        dispatch(setFlashMessage("An error occurred.", "error"));

        reject();
      });
  });
};

export const USER_CLOCK_CORRECTION_REQUEST_CANCEL_REQUEST =
  "USER_CLOCK_CORRECTION_REQUEST_CANCEL_REQUEST";
export const USER_CLOCK_CORRECTION_REQUEST_CANCEL_SUCCESS =
  "USER_CLOCK_CORRECTION_REQUEST_CANCEL_SUCCESS";
export const USER_CLOCK_CORRECTION_REQUEST_CANCEL_FAILURE =
  "USER_CLOCK_CORRECTION_REQUEST_CANCEL_FAILURE";

export const cancelClockCorrectionRequest = () => dispatch => {
  dispatch({
    type: USER_CLOCK_CORRECTION_REQUEST_CANCEL_REQUEST
  });

  axios
    .post("/api/trainee/cancel-clock-correction")
    .then(res => {
      dispatch({
        type: USER_CLOCK_CORRECTION_REQUEST_CANCEL_SUCCESS
      });

      dispatch(getCurrentUser());

      dispatch(
        setFlashMessage("Clock correction canceled successfully", "success")
      );
    })
    .catch(err => {
      dispatch({
        type: USER_CLOCK_CORRECTION_REQUEST_CANCEL_FAILURE,
        payload: err.response.data
      });

      dispatch(setFlashMessage("An error occurred.", "error"));
    });
};
