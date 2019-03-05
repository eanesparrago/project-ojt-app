import {
  APP_FLASH_MESSAGE_SET,
  APP_FLASH_MESSAGE_UNSET
} from "src/services/session/actions/appActionCreators";

const initialState = {
  flashMessage: {
    message: {
      text: "",
      type: ""
    },
    type: null,
    isOpen: false
  }
};

export default function(state = initialState, action) {
  switch (action.type) {
    case APP_FLASH_MESSAGE_SET:
      return {
        ...state,
        flashMessage: {
          isOpen: true,
          message: action.payload
        }
      };

    case APP_FLASH_MESSAGE_UNSET:
      return {
        ...state,
        flashMessage: {
          ...state.flashMessage,
          isOpen: false
        }
      };

    default:
      return state;
  }
}
