import { TOGGLE_REGISTER_FORM, ADD_USER } from "./index";

export function toggleRegisterForm(toggle) {
  return {
    type: TOGGLE_REGISTER_FORM,
    toggle: toggle,
  };
}

export function createUser(email, password) {
  return (dispatch) => {
    // Api call to create a user
    // using a dummy to create user in store
    // also handle if user is already present
    dispatch(addNewUser({ email, password }));
    dispatch(toggleRegisterForm(false));
  };
}

function addNewUser(user) {
  return {
    type: ADD_USER,
    payload: user,
  };
}
