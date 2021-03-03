import {
  SET_REGISTER_FORM_ERRORS,
  REMOVE_REGISTER_FORM_ERRORS,
} from "../../actions/formErrors/registerFormErrors";

const registerFormErrors = (state = [], action) => {
  switch (action.type) {
    case SET_REGISTER_FORM_ERRORS:
      return action.formErrors;

    case REMOVE_REGISTER_FORM_ERRORS:
      return [];

    default:
      return state;
  }
};

export default registerFormErrors;
