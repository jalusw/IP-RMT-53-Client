import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { Theme, ThemePanel } from "@radix-ui/themes";
import { Provider } from "react-redux";
import { store } from "./config/store";

import router from "../routes/router";

import "@radix-ui/themes/styles.css";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <Theme accentColor="indigo" appearance="dark">
        <RouterProvider router={router} />
      </Theme>
    </Provider>
  </StrictMode>,
);
