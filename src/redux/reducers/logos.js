import {
  GET_LOGOS,
  ADD_LOGO_TO_CART,
  REMOVE_LOGO_FROM_CARD,
  RESET_LOGO_STATE,
} from "../actions";
import { logos as logosData } from "../../data/logosData";

const initialLogosState = {
  logosData: [],
  cart: [],
  cartCount: 0,
};

export const logos = (state = initialLogosState, action) => {
  switch (action.type) {
    case GET_LOGOS: {
      return {
        ...state,
        logosData: logosData,
      };
    }
    case ADD_LOGO_TO_CART: {
      return {
        ...state,
        cartCount: state.cartCount + 1,
        cart: [...state.cart, action.payload],
      };
    }
    case REMOVE_LOGO_FROM_CARD: {
      return {
        ...state,
        cartCount: state.cartCount - 1,
        cart: state.cart.filter((logo) => logo.id !== action.payload.id),
      };
    }
    case RESET_LOGO_STATE: {
      return initialLogosState;
    }
    default:
      return state;
  }
};
