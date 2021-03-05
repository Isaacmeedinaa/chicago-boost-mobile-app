import AsyncStorage from "@react-native-async-storage/async-storage";

// URLs
import { API_BASE_URL } from "../../constants/urls";

// loaders
import {
  DEALS_ARE_LOADING,
  DEALS_ARE_NOT_LOADING,
} from "./loaders/dealsLoader";

export const SET_DEALS = "SET_DEALS";
export const REMOVE_DEALS = "REMOVE_DEALS";

export const getDeals = () => {
  return async (dispatch) => {
    let jwt;
    try {
      const asyncStorageJwt = await AsyncStorage.getItem("@jwt");
      if (asyncStorageJwt) {
        jwt = asyncStorageJwt;
      }
    } catch (err) {
      return console.log(err);
    }

    const reqObj = {
      method: "GET",
      headers: {
        "x-auth-token": jwt,
        "Content-Type": "application/json",
        Accepts: "application/json",
      },
    };

    dispatch({ type: DEALS_ARE_LOADING });
    fetch(`${API_BASE_URL}/deals`, reqObj)
      .then((resp) => resp.json())
      .then((deals) => {
        dispatch({ type: SET_DEALS, deals: deals });
        dispatch({ type: DEALS_ARE_NOT_LOADING });
      })
      .catch((err) => {
        dispatch({ type: DEALS_ARE_NOT_LOADING });
      });
  };
};
