import { SET_DEALS, REMOVE_DEALS } from "../../store/actions/deals";

const deals = (state = [], action) => {
  switch (action.type) {
    case SET_DEALS:
      return action.deals;

    case REMOVE_DEALS:
      return [];

    default:
      return state;
  }
};

export default deals;
