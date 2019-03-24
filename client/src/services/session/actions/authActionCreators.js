import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import axios from "axios";

import { getCurrentUser } from "./userActionCreators";

export const AUTH_LOGIN_REQUEST = "AUTH_LOGIN_REQUEST";
export const AUTH_LOGIN_SUCCESS = "AUTH_LOGIN_SUCCESS";
export const AUTH_LOGIN_FAILURE = "AUTH_LOGIN_FAILURE";

export const loginUser = userData => dispatch => {
  dispatch({
    type: AUTH_LOGIN_REQUEST
  });

  axios
    .post("api/users/login", userData)
    .then(res => {
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      setAuthToken(token);

      const decoded = jwt_decode(token);
      dispatch(setCurrentUser(decoded));

      window.location.href = "/app";
    })
    .catch(err => {
      dispatch({
        type: AUTH_LOGIN_FAILURE,
        payload: err.response.data
      });
    });
};

export const setCurrentUser = decoded => dispatch => {
  dispatch({
    type: AUTH_LOGIN_SUCCESS,
    payload: decoded
  });

  dispatch(getCurrentUser());
};

export const logoutUser = () => dispatch => {
  localStorage.removeItem("jwtToken");
  setAuthToken(false);
  dispatch(setCurrentUser({}));
};
