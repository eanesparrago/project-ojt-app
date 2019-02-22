import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import axios from "axios";
import enums from "src/services/enums";

export const AUTH_USER_SET = "AUTH_USER_SET";
export const AUTH_USER_SET_ERROR = "AUTH_USER_SET_ERROR";

export const loginUser = userData => dispatch => {
  axios
    .post("api/users/login", userData)
    .then(res => {
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      setAuthToken(token);
      const decoded = jwt_decode(token);
      dispatch(setCurrentUser(decoded));

      if (decoded.role === enums.roles.ADMINISTRATOR) {
        window.location.href = "/admin";
      } else {
        window.location.href = "/app";
      }
    })
    .catch(err => {
      dispatch({
        type: AUTH_USER_SET_ERROR,
        payload: err.response.data
      });
    });
};

export const setCurrentUser = decoded => {
  return {
    type: AUTH_USER_SET,
    payload: decoded
  };
};

export const logoutUser = () => dispatch => {
  localStorage.removeItem("jwtToken");
  setAuthToken(false);
  dispatch(setCurrentUser({}));
};
