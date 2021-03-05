import { SET_LOCATIONS, REMOVE_LOCATIONS } from "../actions/locations";

const locations = (state = [], action) => {
  switch (action.type) {
    case SET_LOCATIONS:
      return action.locations;

    case REMOVE_LOCATIONS:
      return [];

    default:
      return state;
  }
};

export default locations;
