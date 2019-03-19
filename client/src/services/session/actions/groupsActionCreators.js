import axios from "axios";

export const ADMIN_GROUPS_GET_REQUEST = "ADMIN_GROUPS_GET_REQUEST";
export const ADMIN_GROUPS_GET_SUCCESS = "ADMIN_GROUPS_GET_SUCCESS";
export const ADMIN_GROUPS_GET_FAILURE = "ADMIN_GROUPS_GET_FAILURE";

export const ADMIN_GROUPS_GET_GROUP_REQUEST = "ADMIN_GROUPS_GET_GROUP_REQUEST";
export const ADMIN_GROUPS_GET_GROUP_SUCCESS = "ADMIN_GROUPS_GET_GROUP_SUCCESS";
export const ADMIN_GROUPS_GET_GROUP_FAILURE = "ADMIN_GROUPS_GET_GROUP_FAILURE";

export const ADMIN_GROUPS_GROUP_CREATE_REQUEST =
  "ADMIN_GROUPS_GROUP_CREATE_REQUEST";
export const ADMIN_GROUPS_GROUP_CREATE_SUCCESS =
  "ADMIN_GROUPS_GROUP_CREATE_SUCCESS";
export const ADMIN_GROUPS_GROUP_CREATE_FAILURE =
  "ADMIN_GROUPS_GROUP_CREATE_FAILURE";

export const getGroups = () => dispatch => {
  dispatch({
    type: ADMIN_GROUPS_GET_REQUEST
  });

  axios
    .get("/api/groups")
    .then(res => {
      dispatch({
        type: ADMIN_GROUPS_GET_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: ADMIN_GROUPS_GET_FAILURE,
        payload: err.response.data
      });
    });
};

export const getGroup = groupId => dispatch => {
  dispatch({
    type: ADMIN_GROUPS_GET_GROUP_REQUEST
  });

  axios
    .get(`/api/groups/group/${groupId}`)
    .then(res => {
      dispatch({
        type: ADMIN_GROUPS_GET_GROUP_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: ADMIN_GROUPS_GET_GROUP_FAILURE,
        payload: err.response.data
      });
    });
};

export const createGroup = groupData => dispatch => {
  dispatch({
    type: ADMIN_GROUPS_GROUP_CREATE_REQUEST
  });

  axios
    .post("/api/groups", groupData)
    .then(res => {
      dispatch({
        type: ADMIN_GROUPS_GROUP_CREATE_SUCCESS,
        payload: res.data
      });

      dispatch(getGroups());
    })
    .catch(err => {
      dispatch({
        type: ADMIN_GROUPS_GROUP_CREATE_FAILURE,
        payload: err.response.data
      });
    });
};
