import AsyncStorage from "@react-native-async-storage/async-storage";

// URLs
import { API_BASE_URL } from "../../constants/urls";

// Loaders
import {
  LOCATIONS_ARE_LOADING,
  LOCATIONS_ARE_NOT_LOADING,
  LOCATIONS_ARE_REFRESHING,
  LOCATIONS_ARE_NOT_REFRESHING,
} from "./loaders/locationsLoader";

export const SET_LOCATIONS = "SET_LOCATIONS";
export const REMOVE_LOCATIONS = "REMOVE_LOCATIONS";

export const getLocations = () => {
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

    dispatch({ type: LOCATIONS_ARE_LOADING });
    fetch(`${API_BASE_URL}/locations`, reqObj)
      .then((resp) => resp.json())
      .then((locations) => {
        dispatch({ type: SET_LOCATIONS, locations: locations });
        dispatch({ type: LOCATIONS_ARE_NOT_LOADING });
      })
      .catch((locations) => {
        dispatch({ type: LOCATIONS_ARE_NOT_LOADING });
      });
  };
};

export const getRefreshedLocations = () => {
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

    dispatch({ type: LOCATIONS_ARE_REFRESHING });
    fetch(`${API_BASE_URL}/deals`, reqObj)
      .then((resp) => resp.json())
      .then((locations) => {
        dispatch({ type: SET_LOCATIONS, locations: locations });
        dispatch({ type: LOCATIONS_ARE_NOT_REFRESHING });
      })
      .catch((err) => {
        dispatch({ type: LOCATIONS_ARE_NOT_REFRESHING });
      });
  };
};
