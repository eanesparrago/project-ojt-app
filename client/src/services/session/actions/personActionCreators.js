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
