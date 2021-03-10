import {
  SET_FORGOT_PASSWORD_ERRORS,
  REMOVE_FORGOT_PASSWORD_ERRORS,
} from "../../actions/formErrors/forgotPasswordFormErrors";

const forgotPasswordFormErrors = (state = [], action) => {
  switch (action.type) {
    case SET_FORGOT_PASSWORD_ERRORS:
      return action.formErrors;

    case REMOVE_FORGOT_PASSWORD_ERRORS:
      return [];

    default:
      return state;
  }
};

export default forgotPasswordFormErrors;
