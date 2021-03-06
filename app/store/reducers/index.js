import { combineReducers } from "redux";

// General
import auth from "./auth";
import user from "./user";
import deals from "./deals";
import locations from "./locations";

// Loaders
import userLoader from "./loaders/userLoader";
import dealsLoader from "./loaders/dealsLoader";
import locationsLoader from "./loaders/locationsLoader";

// Form Errors
import loginFormErrors from "./formErrors/loginFormErrors";
import registerFormErrors from "./formErrors/registerFormErrors";
import forgotPasswordFormErrors from "./formErrors/forgotPasswordFormErrors";
import changePasswordFormErrors from "./formErrors/changePasswordFormErrors";
import updatePersonalInfoFormErrors from "./formErrors/updatePersonalInfoFormErrors";

const rootReducer = combineReducers({
  // General
  auth,
  user,
  deals,
  locations,
  // Loaders
  userLoader,
  dealsLoader,
  locationsLoader,
  // Form Errors
  loginFormErrors,
  registerFormErrors,
  forgotPasswordFormErrors,
  changePasswordFormErrors,
  updatePersonalInfoFormErrors,
});

export default rootReducer;
