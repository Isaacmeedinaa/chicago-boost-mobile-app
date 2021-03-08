import React, { useEffect, useState } from "react";
import { AppState } from "react-native";
import { registerRootComponent } from "expo";
import { Provider } from "react-redux";
import store from "./store/store";

import App from "./App";

import * as Notifications from "expo-notifications";
import * as Localization from "expo-localization";
import i18n from "i18n-js";
import { translations } from "./constants/translations";

i18n.translations = translations;
i18n.locale = Localization.locale;
i18n.fallbacks = true;

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
