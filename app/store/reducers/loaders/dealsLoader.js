import {
  DEALS_ARE_LOADING,
  DEALS_ARE_NOT_LOADING,
  DEALS_ARE_REFRESHING,
  DEALS_ARE_NOT_REFRESHING,
} from "../../actions/loaders/dealsLoader";

const initialState = {
  dealsLoader: false,
  dealsRefreshLoader: false,
};

const dealsLoader = (state = initialState, action) => {
  switch (action.type) {
    case DEALS_ARE_LOADING:
      return {
        ...state,
        dealsLoader: true,
      };

    case DEALS_ARE_NOT_LOADING:
      return {
        ...state,
        dealsLoader: false,
      };

    case DEALS_ARE_REFRESHING:
      return {
        ...state,
        dealsRefreshLoader: true,
      };

    case DEALS_ARE_NOT_REFRESHING:
      return {
        ...state,
        dealsRefreshLoader: false,
      };

    default:
      return state;
  }
};

export default dealsLoader;
