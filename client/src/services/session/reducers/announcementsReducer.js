import {
  ANNOUNCEMENTS_GET_FAILURE,
  ANNOUNCEMENTS_GET_REQUEST,
  ANNOUNCEMENTS_GET_SUCCESS,
  ANNOUNCEMENT_GET_REQUEST,
  ANNOUNCEMENT_GET_SUCCESS,
  ANNOUNCEMENT_GET_FAILURE,
  ANNOUNCEMENT_EDIT_REQUEST,
  ANNOUNCEMENT_EDIT_SUCCESS,
  ANNOUNCEMENT_EDIT_FAILURE,
  ANNOUNCEMENT_DELETE_REQUEST,
  ANNOUNCEMENT_DELETE_SUCCESS,
  ANNOUNCEMENT_DELETE_FAILURE
} from "../actions/announcementsActionCreators";

const initialState = {
  announcements: null,
  announcement: {
    data: null,
    isLoading: false,
    errors: {}
  },
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

    // >>>
    case ANNOUNCEMENT_GET_REQUEST:
      return {
        ...state,
        announcement: {
          ...state.announcement,
          isLoading: true,
          data: initialState.announcement.data
        }
      };
    case ANNOUNCEMENT_GET_SUCCESS:
      return {
        ...state,
        announcement: {
          ...state.announcement,
          data: action.payload,
          isLoading: false
        }
      };
    case ANNOUNCEMENT_GET_FAILURE:
      return {
        ...state,
        announcement: {
          ...state.announcement,
          isLoading: false
        }
      };

    // >>>
    case ANNOUNCEMENT_EDIT_REQUEST:
      return {
        ...state,
        announcement: {
          ...state.announcement,
          isLoading: true,
          errors: initialState.announcement.errors
        }
      };
    case ANNOUNCEMENT_EDIT_SUCCESS:
      return {
        ...state,
        announcement: {
          ...state.announcement,
          isLoading: false,
          data: action.payload
        }
      };
    case ANNOUNCEMENT_EDIT_FAILURE:
      return {
        ...state,
        announcement: {
          ...state.announcement,
          isLoading: false,
          errors: action.payload
        }
      };

    // >>>
    case ANNOUNCEMENT_DELETE_REQUEST:
      return {
        ...state,
        announcement: {
          ...state.announcement,
          isLoading: true
        }
      };
    case ANNOUNCEMENT_DELETE_SUCCESS:
      return {
        ...state,
        announcement: {
          ...state.announcement,
          isLoading: false
        }
      };
    case ANNOUNCEMENT_DELETE_FAILURE:
      return {
        ...state,
        announcement: {
          ...state.announcement,
          isLoading: false
        }
      };

    default:
      return state;
  }
}
