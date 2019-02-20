export const ADMIN_PERSON_MODAL_TOGGLE = "ADMIN_PERSON_MODAL_TOGGLE";
export const ADMIN_PERSON_MODAL_CLOSE = "ADMIN_PERSON_MODAL_CLOSE";

export const togglePersonModal = () => {
  return {
    type: ADMIN_PERSON_MODAL_TOGGLE,
    payload: ""
  };
};

export const closePersonModal = () => {
  return {
    type: ADMIN_PERSON_MODAL_CLOSE,
    payload: ""
  };
};
