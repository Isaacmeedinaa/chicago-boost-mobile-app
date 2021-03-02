import { combineReducers } from "redux";

// General
import auth from "./auth";
import user from "./user";

// Loaders
import userLoader from "./loaders/userLoader";

// Form Errors
import loginFormErrors from "./formErrors/loginFormErrors";

const rootReducer = combineReducers({
  // General
  auth,
  user,
  // Loaders
  userLoader,
  // Form Errors
  loginFormErrors,
});

export default rootReducer;
