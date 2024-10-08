import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { persistor, store } from "./config/store";
import { ToastContainer } from "react-toastify";

import router from "../routes/router";

import "@radix-ui/themes/styles.css";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";

import { PersistGate } from "redux-persist/integration/react";
import Theme from "./components/theme/Theme";
import { GoogleOAuthProvider } from "@react-oauth/google";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ToastContainer />
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Theme>
            <RouterProvider router={router} />
          </Theme>
        </PersistGate>
      </Provider>
    </GoogleOAuthProvider>
  </StrictMode>,
);
