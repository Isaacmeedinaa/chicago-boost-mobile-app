import { combineReducers } from "redux";

// General
import auth from "./auth";
import user from "./user";
import deals from "./deals";

// Loaders
import userLoader from "./loaders/userLoader";
import dealsLoader from "./loaders/dealsLoader";

// Form Errors
import loginFormErrors from "./formErrors/loginFormErrors";
import registerFormErrors from "./formErrors/registerFormErrors";
import forgotPasswordFormErrors from "./formErrors/forgotPasswordFormErrors";
import changePasswordFormErrors from "./formErrors/changePasswordFormErrors";

const rootReducer = combineReducers({
  // General
  auth,
  user,
  deals,
  // Loaders
  userLoader,
  dealsLoader,
  // Form Errors
  loginFormErrors,
  registerFormErrors,
  forgotPasswordFormErrors,
  changePasswordFormErrors,
});

export default rootReducer;
