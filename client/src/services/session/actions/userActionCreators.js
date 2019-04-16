import axios from "axios";

import { setFlashMessage } from "./appActionCreators";
import { getOwnGroup } from "./groupActionCreators";

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
  if (window.confirm("Confirm clock?")) {
    dispatch({
      type: USER_CLOCK_REQUEST
    });

    axios
      .post("/api/trainee/clock", data)
      .then(res => {
        dispatch({
          type: USER_CLOCK_SUCCESS
        });

        dispatch(getCurrentUser());
        dispatch(getOwnGroup());
        dispatch(setFlashMessage("Clocked successfully.", "success"));
      })
      .catch(err => {
        dispatch({
          type: USER_CLOCK_FAILURE
        });

        dispatch(setFlashMessage("An error occurred.", "error"));
      });
  }
};

export const USER_CLOCK_CORRECTION_REQUEST_REQUEST =
  "USER_CLOCK_CORRECTION_REQUEST_REQUEST";
export const USER_CLOCK_CORRECTION_REQUEST_SUCCESS =
  "USER_CLOCK_CORRECTION_REQUEST_SUCCESS";
export const USER_CLOCK_CORRECTION_REQUEST_FAILURE =
  "USER_CLOCK_CORRECTION_REQUEST_FAILURE";

// >>> data: { in, out, clockId }
export const requestClockCorrection = data => dispatch => {
  return new Promise(resolve => {
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

export const USER_SCHEDULE_UPDATE_REQUEST_REQUEST =
  "USER_SCHEDULE_UPDATE_REQUEST_REQUEST";
export const USER_SCHEDULE_UPDATE_REQUEST_SUCCESS =
  "USER_SCHEDULE_UPDATE_REQUEST_SUCCESS";
export const USER_SCHEDULE_UPDATE_REQUEST_FAILURE =
  "USER_SCHEDULE_UPDATE_REQUEST_FAILURE";

// >>> data
export const requestScheduleUpdate = data => dispatch => {
  return new Promise(resolve => {
    dispatch({
      type: USER_SCHEDULE_UPDATE_REQUEST_REQUEST
    });

    axios
      .put("/api/trainee/schedule-update-request", data)
      .then(res => {
        dispatch({
          type: USER_SCHEDULE_UPDATE_REQUEST_SUCCESS
        });

        dispatch(getCurrentUser());

        dispatch(
          setFlashMessage(
            "Schedule update request submitted successfully",
            "success"
          )
        );

        resolve();
      })
      .catch(err => {
        dispatch({
          type: USER_SCHEDULE_UPDATE_REQUEST_FAILURE,
          payload: err.response.data
        });

        dispatch(setFlashMessage("An error occurred", "error"));
      });
  });
};

export const USER_SCHEDULE_UPDATE_REQUEST_CANCEL_REQUEST =
  "USER_SCHEDULE_UPDATE_REQUEST_CANCEL_REQUEST";
export const USER_SCHEDULE_UPDATE_REQUEST_CANCEL_SUCCESS =
  "USER_SCHEDULE_UPDATE_REQUEST_CANCEL_SUCCESS";
export const USER_SCHEDULE_UPDATE_REQUEST_CANCEL_FAILURE =
  "USER_SCHEDULE_UPDATE_REQUEST_CANCEL_FAILURE";

export const cancelScheduleUpdateRequest = () => dispatch => {
  dispatch({
    type: USER_SCHEDULE_UPDATE_REQUEST_CANCEL_REQUEST
  });

  axios
    .put("/api/trainee/cancel-schedule-update-request")
    .then(res => {
      dispatch({
        type: USER_SCHEDULE_UPDATE_REQUEST_CANCEL_SUCCESS
      });

      dispatch(getCurrentUser());

      dispatch(
        setFlashMessage(
          "Schedule update request cancelled successfully.",
          "success"
        )
      );
    })
    .catch(err => {
      dispatch({
        type: USER_SCHEDULE_UPDATE_REQUEST_CANCEL_FAILURE
      });

      dispatch(setFlashMessage("An error occurred.", "error"));
    });
};

export const USER_LEAVE_REQUEST_REQUEST = "USER_LEAVE_REQUEST_REQUEST";
export const USER_LEAVE_REQUEST_SUCCESS = "USER_LEAVE_REQUEST_SUCCESS";
export const USER_LEAVE_REQUEST_FAILURE = "USER_LEAVE_REQUEST_FAILURE";

export const requestLeave = data => dispatch => {
  return new Promise(resolve => {
    dispatch({
      type: USER_LEAVE_REQUEST_REQUEST
    });

    axios
      .put("/api/trainee/request-leave", data)
      .then(res => {
        dispatch({
          type: USER_LEAVE_REQUEST_SUCCESS
        });

        dispatch(getCurrentUser());

        dispatch(
          setFlashMessage("Leave request submitted successfully.", "success")
        );

        resolve();
      })
      .catch(err => {
        dispatch({
          type: USER_LEAVE_REQUEST_FAILURE,
          payload: err.response.data
        });

        dispatch(setFlashMessage("An error occurred.", "error"));
      });
  });
};

export const USER_LEAVE_REQUEST_CANCEL_REQUEST =
  "USER_LEAVE_REQUEST_CANCEL_REQUEST";
export const USER_LEAVE_REQUEST_CANCEL_SUCCESS =
  "USER_LEAVE_REQUEST_CANCEL_SUCCESS";
export const USER_LEAVE_REQUEST_CANCEL_FAILURE =
  "USER_LEAVE_REQUEST_CANCEL_FAILURE";

export const cancelLeaveRequest = leaveRequestId => dispatch => {
  dispatch({
    type: USER_LEAVE_REQUEST_CANCEL_REQUEST
  });

  axios
    .put("/api/trainee/cancel-leave-request", { leaveRequestId })
    .then(res => {
      dispatch({ type: USER_LEAVE_REQUEST_CANCEL_SUCCESS });
      dispatch(getCurrentUser());
      dispatch(
        setFlashMessage("Leave request cancelled successfully.", "success")
      );
    })
    .catch(err => {
      dispatch({
        type: USER_LEAVE_REQUEST_CANCEL_FAILURE
      });
      dispatch(setFlashMessage("An error occurred.", "error"));
    });
};

export const USER_LEAVE_CANCEL_REQUEST = "USER_LEAVE_CANCEL_REQUEST";
export const USER_LEAVE_CANCEL_SUCCESS = "USER_LEAVE_CANCEL_SUCCESS";
export const USER_LEAVE_CANCEL_FAILURE = "USER_LEAVE_CANCEL_FAILURE";

export const cancelLeave = leaveId => dispatch => {
  dispatch({
    type: USER_LEAVE_CANCEL_REQUEST
  });

  axios
    .put("/api/trainee/cancel-leave", { leaveId })
    .then(res => {
      dispatch({ type: USER_LEAVE_CANCEL_SUCCESS });
      dispatch(getCurrentUser());
      dispatch(setFlashMessage("Leave cancelled successfully.", "success"));
    })
    .catch(err => {
      dispatch({
        type: USER_LEAVE_CANCEL_FAILURE
      });
      dispatch(setFlashMessage("An error occurred.", "error"));
    });
};
