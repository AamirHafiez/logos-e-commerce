import { combineReducers } from "redux";
import { loginRegister } from "./loginRegister";
import { user } from "./user";
import { logos } from "./logos";

const rootReducer = combineReducers({
  loginRegister,
  user,
  logos,
});

export default rootReducer;
