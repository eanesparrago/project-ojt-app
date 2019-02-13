import { MAIN_DATA_POSTS_ADD } from "./postsActions";

const initialState = [];

export const postsReducer = (state = initialState, action) => {
  switch (action.type) {
    case MAIN_DATA_POSTS_ADD:
      return [...state, action.payload];

    default:
      return state;
  }
};
