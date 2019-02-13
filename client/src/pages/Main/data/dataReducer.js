import { combineReducers } from "redux";

import { postsReducer } from "./posts/postsReducer";

export const dataReducer = combineReducers({
  posts: postsReducer
});
