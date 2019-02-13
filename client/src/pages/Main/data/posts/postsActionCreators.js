import axios from "axios";

export const MAIN_DATA_POSTS_GET_REQUEST = "MAIN_DATA_POSTS_GET_REQUEST";
export const MAIN_DATA_POSTS_GET_SUCCESS = "MAIN_DATA_POSTS_GET_SUCCESS";
export const MAIN_DATA_POSTS_GET_ERROR = "MAIN_DATA_POSTS_GET_ERROR";

export const MAIN_DATA_POSTS_ADD_REQUEST = "MAIN_DATA_POSTS_ADD_REQUEST";
export const MAIN_DATA_POSTS_ADD_SUCCESS = "MAIN_DATA_POSTS_ADD_SUCCESS";
export const MAIN_DATA_POSTS_ADD_ERROR = "MAIN_DATA_POSTS_ADD_ERROR";

export const getPosts = () => dispatch => {
  dispatch({
    type: MAIN_DATA_POSTS_GET_REQUEST
  });

  axios
    .get("/api/posts")
    .then(res => {
      dispatch({
        type: MAIN_DATA_POSTS_GET_SUCCESS,
        payload: res.data.posts
      });
    })
    .catch(err => {
      dispatch({
        type: MAIN_DATA_POSTS_GET_ERROR,
        payload: err.response.data
      });
    });
};

export const addPost = postData => dispatch => {
  dispatch({
    type: MAIN_DATA_POSTS_ADD_REQUEST
  });

  axios
    .post("/api/posts", postData)
    .then(res => {
      dispatch({
        type: MAIN_DATA_POSTS_ADD_SUCCESS,
        payload: res.data.post
      });
    })
    .catch(err => {
      dispatch({
        type: MAIN_DATA_POSTS_ADD_ERROR,
        payload: err.response.data
      });
    });
};
