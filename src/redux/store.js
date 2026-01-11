import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice"; // आपका स्लाइस
import storage from "redux-persist/lib/storage"; // default: localStorage
import { persistReducer, persistStore } from "redux-persist";
import { combineReducers } from "redux";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user"], // सिर्फ 'user' स्लाइस को सेव करेगा
};

const rootReducer = combineReducers({
  user: userReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Redux Persist के लिए इसे false करना जरूरी है
    }),
});

export const persistor = persistStore(store);