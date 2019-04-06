import { ERRORS_SET, ERRORS_CLEAR } from "../actions/errorsActionCreators";

const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
    case ERRORS_SET:
      return action.payload;

    case ERRORS_CLEAR:
      return initialState;

    default:
      return state;
  }
}
