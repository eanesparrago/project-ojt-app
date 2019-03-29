import axios from "axios";

export const PEOPLE_PERSON_GET_REQUEST = "PEOPLE_PERSON_GET_REQUEST";
export const PEOPLE_PERSON_GET_SUCCESS = "PEOPLE_PERSON_GET_SUCCESS";
export const PEOPLE_PERSON_GET_FAILURE = "PEOPLE_PERSON_GET_FAILURE";

export const getPerson = id => dispatch => {
  dispatch({
    type: PEOPLE_PERSON_GET_REQUEST
  });

  axios
    .get(`/api/users/user/${id}`)
    .then(res => {
      dispatch({
        type: PEOPLE_PERSON_GET_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: PEOPLE_PERSON_GET_FAILURE,
        payload: err.response.data
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
        type: PERSON_CLOCK_EDIT_SUCCESS
      });

      dispatch(getPerson(data.userId));
    })
    .catch(err => {
      dispatch({
        type: PERSON_CLOCK_EDIT_FAILURE,
        payload: err.response.data
      });
    });
};

export const PERSON_ERRORS_CLEAR = "PERSON_ERRORS_CLEAR";

export const clearErrors = () => ({
  type: PERSON_ERRORS_CLEAR
});
