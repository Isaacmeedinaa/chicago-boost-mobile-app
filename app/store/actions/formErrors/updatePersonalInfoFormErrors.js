export const SET_UPDATE_PERSONAL_INFO_ERRORS =
  "SET_UPDATE_PERSONAL_INFO_ERRORS";
export const REMOVE_UPDATE_PERSONAL_INFO_ERRORS =
  "REMOVE_UPDATE_PERSONAL_INFO_ERRORS";

export const clearUpdatepersonalInfoErrors = () => {
  return {
    type: REMOVE_UPDATE_PERSONAL_INFO_ERRORS,
  };
};
