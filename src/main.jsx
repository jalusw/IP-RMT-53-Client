import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { persistor, store } from "./config/store";

import router from "../routes/router";

import "@radix-ui/themes/styles.css";
import "./index.css";
import { PersistGate } from "redux-persist/integration/react";
import Theme from "./components/theme/Theme";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Theme>
          <RouterProvider router={router} />
        </Theme>
      </PersistGate>
    </Provider>
  </StrictMode>,
);
