import _ from "lodash";
import { combineReducers } from "redux";
import { dataReducer } from "./data/dataReducer";
import {
  MAIN_DATA_POSTS_ADD_REQUEST,
  MAIN_DATA_POSTS_ADD_SUCCESS,
  MAIN_DATA_POSTS_ADD_ERROR
} from "./data/posts/postsActionCreators";

const MAIN_TOGGLE = "MAIN_TOGGLE";

const initialState = {
  isLoading: false,
  isVisible: false
};

const isLoadingReducer = (state, action) => {
  switch (action.type) {
    case MAIN_DATA_POSTS_ADD_REQUEST:
      return true;

    case MAIN_DATA_POSTS_ADD_SUCCESS:
    case MAIN_DATA_POSTS_ADD_ERROR:
      return false;

    default:
      return state;
  }
};

export const mainReducer = (state = initialState, action) => {
  switch (action.type) {
    case MAIN_TOGGLE:
      return { ...state, isVisible: !state.isVisible };

    default:
      const rest = _.omit(state, Object.keys(initialState));
      return {
        ...state,
        isLoading: isLoadingReducer(state.isLoading, action),
        data: dataReducer(rest.data, action)
      };
  }
};