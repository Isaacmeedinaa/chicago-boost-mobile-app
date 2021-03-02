export const LOGIN_ERRORS = "LOGIN_ERRORS";
export const NO_LOGIN_ERRORS = "NO_LOGIN_ERRORS";

export const clearLoginFormErrors = () => {
  return {
    type: NO_LOGIN_ERRORS,
  };
};
