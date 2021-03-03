export const SET_FORGOT_PASSWORD_ERRORS = "SET_FORGOT_PASSWORD_ERRORS";
export const REMOVE_FORGOT_PASSWORD_ERRORS = "REMOVE_FORGOT_PASSWORD_ERRORS";

export const clearForgotPasswordFormErrors = () => {
  return {
    type: REMOVE_FORGOT_PASSWORD_ERRORS,
  };
};
