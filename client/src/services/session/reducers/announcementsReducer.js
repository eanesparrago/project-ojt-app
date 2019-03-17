import {
  ANNOUNCEMENTS_GET_FAILURE,
  ANNOUNCEMENTS_GET_REQUEST,
  ANNOUNCEMENTS_GET_SUCCESS
} from "../actions/announcementsActionCreators";

const initialState = {
  announcements: null,
  announcement: null,
  isLoading: false,
  errors: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ANNOUNCEMENTS_GET_REQUEST:
      return {
        ...state,
        isLoading: true,
        errors: initialState.errors,
        announcements: initialState.announcements
      };

    case ANNOUNCEMENTS_GET_SUCCESS:
      return {
        ...state,
        isLoading: false,
        announcements: action.payload.announcements
      };

    case ANNOUNCEMENTS_GET_FAILURE:
      return {
        ...state,
        isLoading: false,
        errors: action.payload
      };

    default:
      return state;
  }
}
