export const APP_FLASH_MESSAGE_SET = "APP_FLASH_MESSAGE_SET";
export const APP_FLASH_MESSAGE_UNSET = "APP_FLASH_MESSAGE_UNSET";

export const setFlashMessage = (message = "", type = "success") => dispatch => {
  dispatch({
    type: APP_FLASH_MESSAGE_SET,
    payload: { message, type }
  });

  setTimeout(() => {
    dispatch(unsetFlashMessage());
  }, 5000);
};

export const unsetFlashMessage = () => dispatch => {
  dispatch({
    type: APP_FLASH_MESSAGE_UNSET
  });
};
