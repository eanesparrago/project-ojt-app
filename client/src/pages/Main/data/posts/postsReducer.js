import { ADD } from "./postsActions";

const initialState = [];

export const postsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD:
      return [...state, action.payload];

    default:
      return state;
  }
};
