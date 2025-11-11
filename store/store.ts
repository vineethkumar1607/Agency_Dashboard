import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";

/**
 * Global Redux store configuration.
 * This will hold all slices of your application state.
 */
export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

/**
 * Root state and dispatch types
 * These help keep useSelector and useDispatch strongly typed.
 */
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
