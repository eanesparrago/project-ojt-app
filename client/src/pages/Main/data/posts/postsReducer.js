import { MAIN_DATA_POSTS_GET_SUCCESS } from "./postsActionCreators";

const initialState = [];

export const postsReducer = (state = initialState, action) => {
  switch (action.type) {
    case MAIN_DATA_POSTS_GET_SUCCESS:
      return action.payload;

    default:
      return state;
  }
};
