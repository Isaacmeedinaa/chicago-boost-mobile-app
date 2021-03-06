import {
  SET_UPDATE_PERSONAL_INFO_ERRORS,
  REMOVE_UPDATE_PERSONAL_INFO_ERRORS,
} from "../../actions/formErrors/updatePersonalInfoFormErrors";

const updatePersonalInfoFormErrors = (state = [], action) => {
  switch (action.type) {
    case SET_UPDATE_PERSONAL_INFO_ERRORS:
      return action.formErrors;

    case REMOVE_UPDATE_PERSONAL_INFO_ERRORS:
      return [];

    default:
      return state;
  }
};

export default updatePersonalInfoFormErrors;
