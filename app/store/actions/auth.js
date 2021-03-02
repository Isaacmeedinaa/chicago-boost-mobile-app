export const SET_IS_AUTHENTICATED = "SET_IS_AUTHENTICATED";
export const SET_IS_NOT_AUTHENTICATED = "SET_IS_NOT_AUTHENTICATED";

export const setIsNotAuthenticated = () => {
  return {
    type: SET_IS_NOT_AUTHENTICATED,
  };
};
