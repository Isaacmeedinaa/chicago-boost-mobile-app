import {
  DEALS_ARE_LOADING,
  DEALS_ARE_NOT_LOADING,
} from "../../actions/loaders/dealsLoader";

const initialState = {
  dealsLoader: false,
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

    default:
      return state;
  }
};

export default dealsLoader;
