import React from "react";
import { registerRootComponent } from "expo";
import { Provider } from "react-redux";
import store from "./store/store";

import App from "./App";

const Main = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

registerRootComponent(Main);
