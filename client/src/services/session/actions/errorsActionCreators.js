export const ERRORS_SET = "ERRORS_SET";
export const ERRORS_CLEAR = "ERRORS_CLEAR";

export const clearErrors = () => {
  return {
    type: ERRORS_CLEAR
  };
};
