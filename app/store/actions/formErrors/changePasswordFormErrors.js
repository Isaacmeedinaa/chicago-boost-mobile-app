export const SET_CHANGE_PASSWORD_ERRORS = "SET_CHANGE_PASSWORD_ERRORS";
export const REMOVE_CHANGE_PASSWORD_ERRORS = "REMOVE_CHANGE_PASSWORD_ERRORS";

export const clearChangePasswordFormErrors = () => {
  return {
    type: REMOVE_CHANGE_PASSWORD_ERRORS,
  };
};
