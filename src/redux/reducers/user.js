import { ADD_USER } from "../actions";

const initialUserState = {
  users: [],
};

export const user = (state = initialUserState, action) => {
  switch (action.type) {
    case ADD_USER: {
      return {
        ...state,
        users: [...state.users, action.payload],
      };
    }
    default:
      return state;
  }
};
