import React, { useEffect, useState } from "react";
import { AppState } from "react-native";
import { registerRootComponent } from "expo";
import { Provider } from "react-redux";
import store from "./store/store";

import App from "./App";

import * as Notifications from "expo-notifications";

const Main = () => {
  const [appState] = useState(AppState.currentState);

  useEffect(() => {
    AppState.addEventListener("change", removeNotificationBadgeCount);

    return () => {
      AppState.removeEventListener("change", removeNotificationBadgeCount);
    };
  }, []);

  const removeNotificationBadgeCount = () => {
    if (appState.match("active")) {
      Notifications.setBadgeCountAsync(0);
    }
  };

  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

registerRootComponent(Main);
