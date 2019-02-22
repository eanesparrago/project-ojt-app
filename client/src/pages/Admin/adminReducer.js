import { ADMIN_PERSON_MODAL_TOGGLE } from "./adminActionCreators";
import { ADMIN_PERSON_MODAL_CLOSE } from "./adminActionCreators";

const initialState = {
  isPersonModalOpen: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADMIN_PERSON_MODAL_TOGGLE:
      return {
        ...state,
        isPersonModalOpen: !state.isPersonModalOpen
      };

    case ADMIN_PERSON_MODAL_CLOSE:
      return {
        ...state,
        isPersonModalOpen: false
      };

    default:
      return {
        ...state
      };
  }
};
