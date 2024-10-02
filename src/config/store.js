import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import { api } from "../services/api";

import { authSlice } from "../slices/authSlice";
import { themeSlice } from "../slices/themeSlice";

const persistedReducer = persistReducer(
  {
    key: "root",
    storage,
    blacklist: [api.reducerPath],
    whitelist: ["auth", "theme"],
  },
  combineReducers({
    [api.reducerPath]: api.reducer,
    auth: authSlice.reducer,
    theme: themeSlice.reducer,
  }),
);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }).concat(api.middleware),
});

export const persistor = persistStore(store);
