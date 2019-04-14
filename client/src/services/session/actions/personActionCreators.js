import axios from "axios";

import { setFlashMessage } from "./appActionCreators";
import { clearErrors } from "./errorsActionCreators";
import { getGroups } from "./groupsActionCreators";
import { getGroup, getOwnGroup } from "./groupActionCreators";
import { getPeople } from "./peopleActionCreators";
import { getCurrentUser } from "./userActionCreators";

import enums from "src/services/enums";

import { ERRORS_SET } from "./errorsActionCreators";

export const PERSON_LOADING_SET = "PERSON_LOADING_SET";
export const PERSON_LOADING_UNSET = "PERSON_LOADING_UNSET";
export const PERSON_DATA_CLEAR = "PERSON_DATA_CLEAR";

export const PERSON_GET = "PERSON_GET";
export const PERSON_EDIT = "PERSON_EDIT";
export const PERSON_SCHEDULE_EDIT = "PERSON_SCHEDULE_EDIT";
export const PERSON_PASSWORD_CHANGE = "PERSON_PASSWORD_CHANGE";
export const PERSON_CLOCK_EDIT = "PERSON_CLOCK_EDIT";

const setPersonLoading = () => {
  return {
    type: PERSON_LOADING_SET
  };
};

const unsetPersonLoading = () => {
  return {
    type: PERSON_LOADING_UNSET
  };
};

const clearPersonData = () => {
  return {
    type: PERSON_DATA_CLEAR
  };
};

const handleRequest = () => dispatch => {
  dispatch(clearErrors());
  dispatch(setPersonLoading());
};

const handleError = err => dispatch => {
  dispatch({
    type: ERRORS_SET,
    payload: err.response.data
  });

  dispatch(unsetPersonLoading());
  dispatch(setFlashMessage("An error occurred.", "error"));
};

export const getPerson = id => dispatch => {
  dispatch(handleRequest());
  dispatch(clearPersonData());

  axios
    .get(`/api/users/user/${id}`)
    .then(res => {
      dispatch({
        type: PERSON_GET,
        payload: res.data
      });
    })
    .catch(err => {
      handleError(err);
    });
};

export const editPerson = data => dispatch => {
  return new Promise(resolve => {
    dispatch(handleRequest());

    axios
      .put(`/api/users/${data.id}`, data)
      .then(res => {
        dispatch({
          type: PERSON_EDIT,
          payload: res.data.user
        });

        dispatch(setFlashMessage("User edited successfully.", "success"));
        dispatch(getPeople());

        if (res.data.user.role !== enums.roles.ADMINISTRATOR) {
          dispatch(getGroups());
          dispatch(getGroup(res.data.user.roleData.group._id));
        }

        dispatch(getCurrentUser());

        resolve();
      })
      .catch(err => {
        dispatch(handleError(err));
      });
  });
};

export const editSchedule = (personId, data) => (dispatch, getState) => {
  const { user } = getState().auth;

  return new Promise(resolve => {
    dispatch(handleRequest());

    axios
      .put(`/api/users/${personId}/schedule`, data)
      .then(res => {
        dispatch({
          type: PERSON_SCHEDULE_EDIT,
          payload: res.data.user
        });

        dispatch(
          setFlashMessage("User schedule edited successfully.", "success")
        );

        if (user.role === enums.roles.ADMINISTRATOR) {
          if (res.data.user.role !== enums.roles.ADMINISTRATOR) {
            dispatch(getGroups());
            dispatch(getGroup(res.data.user.roleData.group._id));
          }
        } else {
          dispatch(getOwnGroup());
        }

        dispatch(getCurrentUser());

        resolve();
      })
      .catch(err => {
        dispatch(handleError(err));
      });
  });
};

export const changePassword = (personId, data) => dispatch => {
  return new Promise(resolve => {
    dispatch(handleRequest());

    axios
      .put(`/api/users/${personId}/change-password`, data)
      .then(res => {
        dispatch({
          type: PERSON_PASSWORD_CHANGE
        });

        dispatch(
          setFlashMessage("User password changed successfully.", "success")
        );

        resolve();
      })
      .catch(err => {
        dispatch(handleError(err));
      });
  });
};

export const editClock = data => dispatch => {
  return new Promise(resolve => {
    dispatch(handleRequest());

    axios
      .post(`/api/clocks/${data.clockId}`, data.clock)
      .then(res => {
        dispatch({
          type: PERSON_CLOCK_EDIT,
          payload: res.data.user
        });

        dispatch(setFlashMessage("Updated clock successfully", "success"));
        resolve();
      })
      .catch(err => {
        dispatch(handleError(err));
      });
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
      dispatch(getPeople());
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
      dispatch(getPeople());

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

export const PERSON_SCHEDULE_UPDATE_REQUEST_APPROVE_REQUEST =
  "PERSON_SCHEDULE_UPDATE_REQUEST_APPROVE_REQUEST";
export const PERSON_SCHEDULE_UPDATE_REQUEST_APPROVE_SUCCESS =
  "PERSON_SCHEDULE_UPDATE_REQUEST_APPROVE_SUCCESS";
export const PERSON_SCHEDULE_UPDATE_REQUEST_APPROVE_FAILURE =
  "PERSON_SCHEDULE_UPDATE_REQUEST_APPROVE_FAILURE";

export const approveScheduleUpdateRequest = userId => dispatch => {
  dispatch({
    type: PERSON_SCHEDULE_UPDATE_REQUEST_APPROVE_REQUEST
  });

  axios
    .put("/api/trainee/approve-schedule-update-request", { userId })
    .then(res => {
      dispatch({
        type: PERSON_SCHEDULE_UPDATE_REQUEST_APPROVE_SUCCESS
      });

      dispatch(getPerson(userId));
      dispatch(getPeople());
      dispatch(
        setFlashMessage(
          "Schedule update request approved successfully.",
          "success"
        )
      );
    })
    .catch(err => {
      dispatch({
        type: PERSON_SCHEDULE_UPDATE_REQUEST_APPROVE_FAILURE
      });

      dispatch(setFlashMessage("An error occurred.", "error"));
    });
};

export const PERSON_SCHEDULE_UPDATE_REQUEST_REJECT_REQUEST =
  "PERSON_SCHEDULE_UPDATE_REQUEST_REJECT_REQUEST";
export const PERSON_SCHEDULE_UPDATE_REQUEST_REJECT_SUCCESS =
  "PERSON_SCHEDULE_UPDATE_REQUEST_REJECT_SUCCESS";
export const PERSON_SCHEDULE_UPDATE_REQUEST_REJECT_FAILURE =
  "PERSON_SCHEDULE_UPDATE_REQUEST_REJECT_FAILURE";

export const rejectScheduleUpdateRequest = userId => dispatch => {
  dispatch({
    type: PERSON_SCHEDULE_UPDATE_REQUEST_REJECT_REQUEST
  });

  axios
    .put("/api/trainee/reject-schedule-update-request", { userId })
    .then(res => {
      dispatch({
        type: PERSON_SCHEDULE_UPDATE_REQUEST_REJECT_SUCCESS
      });

      dispatch(getPerson(userId));
      dispatch(getPeople());
      dispatch(
        setFlashMessage(
          "Schedule update request rejected successfully.",
          "success"
        )
      );
    })
    .catch(err => {
      dispatch({
        type: PERSON_SCHEDULE_UPDATE_REQUEST_REJECT_FAILURE
      });

      dispatch(setFlashMessage("An error occurred.", "error"));
    });
};
