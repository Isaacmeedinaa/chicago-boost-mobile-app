import {
  SET_CHANGE_PASSWORD_ERRORS,
  REMOVE_CHANGE_PASSWORD_ERRORS,
} from "../../actions/formErrors/changePasswordFormErrors";

const changePasswordFormErrors = (state = [], action) => {
  switch (action.type) {
    case SET_CHANGE_PASSWORD_ERRORS:
      return action.formErrors;

    case REMOVE_CHANGE_PASSWORD_ERRORS:
      return [];

    default:
      return state;
  }
};

export default changePasswordFormErrors;
