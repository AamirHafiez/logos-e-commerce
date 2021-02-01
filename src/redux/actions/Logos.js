import {
  GET_LOGOS,
  ADD_LOGO_TO_CART,
  REMOVE_LOGO_FROM_CARD,
  RESET_LOGO_STATE,
} from "./";

export function getLogos() {
  return {
    type: GET_LOGOS,
  };
}

export function addLogoToCart(logo) {
  return {
    type: ADD_LOGO_TO_CART,
    payload: logo,
  };
}

export function removeLogoFromCart(logo) {
  return {
    type: REMOVE_LOGO_FROM_CARD,
    payload: logo,
  };
}

export function resetLogoStates() {
  return {
    type: RESET_LOGO_STATE,
  };
}
