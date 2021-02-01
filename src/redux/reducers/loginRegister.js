import { TOGGLE_REGISTER_FORM } from "../actions";

const initialLoginRegisterState = {
  showRegister: false,
};

export const loginRegister = (state = initialLoginRegisterState, action) => {
  switch (action.type) {
    case TOGGLE_REGISTER_FORM:
      return { ...state, showRegister: action.toggle };
    default:
      return state;
  }
};
