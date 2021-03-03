export const SET_REGISTER_FORM_ERRORS = "SET_REGISTER_FORM_ERRORS";
export const REMOVE_REGISTER_FORM_ERRORS = "REMOVE_REGISTER_FORM_ERRORS";

export const clearRegisterFormErrors = () => {
  return {
    type: REMOVE_REGISTER_FORM_ERRORS,
  };
};
