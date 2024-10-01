import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { Theme, ThemePanel } from "@radix-ui/themes";
import { Provider } from "react-redux";
import { persistor, store } from "./config/store";

import router from "../routes/router";

import "@radix-ui/themes/styles.css";
import "./index.css";
import { PersistGate } from "redux-persist/integration/react";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Theme accentColor="cyan" appearance="light">
          <RouterProvider router={router} />
        </Theme>
      </PersistGate>
    </Provider>
  </StrictMode>,
);
