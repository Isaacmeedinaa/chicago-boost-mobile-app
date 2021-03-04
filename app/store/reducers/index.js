import { combineReducers } from "redux";

// General
import auth from "./auth";
import user from "./user";

// Loaders
import userLoader from "./loaders/userLoader";

// Form Errors
import loginFormErrors from "./formErrors/loginFormErrors";
import registerFormErrors from "./formErrors/registerFormErrors";
import forgotPasswordFormErrors from "./formErrors/forgotPasswordFormErrors";
import changePasswordFormErrors from "./formErrors/changePasswordFormErrors";

const rootReducer = combineReducers({
  // General
  auth,
  user,
  // Loaders
  userLoader,
  // Form Errors
  loginFormErrors,
  registerFormErrors,
  forgotPasswordFormErrors,
  changePasswordFormErrors,
});

export default rootReducer;
