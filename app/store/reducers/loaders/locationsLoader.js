import {
  LOCATIONS_ARE_LOADING,
  LOCATIONS_ARE_NOT_LOADING,
  LOCATIONS_ARE_REFRESHING,
  LOCATIONS_ARE_NOT_REFRESHING,
} from "../../actions/loaders/locationsLoader";

const initialState = {
  locationsLoader: false,
  locationsRefreshLoader: false,
};

const locationsLoader = (state = initialState, action) => {
  switch (action.type) {
    case LOCATIONS_ARE_LOADING:
      return {
        ...state,
        locationsLoader: true,
      };

    case LOCATIONS_ARE_NOT_LOADING:
      return {
        ...state,
        locationsLoader: false,
      };

    case LOCATIONS_ARE_REFRESHING:
      return {
        ...state,
        locationsRefreshLoader: true,
      };

    case LOCATIONS_ARE_NOT_REFRESHING:
      return {
        ...state,
        locationsRefreshLoader: false,
      };

    default:
      return state;
  }
};

export default locationsLoader;
