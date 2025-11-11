import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type {  PayloadAction } from "@reduxjs/toolkit";
import type { User } from "firebase/auth";
import { listenToAuthChanges, getExistingUser } from "~/firebase/auth";

/**
 * Shape of the authentication state in Redux.
 * Holds both Firebase Auth user and Firestore user profile.
 */
export interface AuthState {
  firebaseUser: User | null;
  profile: any | null;
  loading: boolean;
  error: string | null;
  initialized: boolean;
}

const initialState: AuthState = {
  firebaseUser: null,
  profile: null,
  loading: false,
  error: null,
  initialized: false,
};

/**
 * Initializes Firebase authentication listener.
 * Automatically dispatches `setUser()` or `clearUser()`
 * depending on Firebase Auth state.
 */
export const initializeAuthListener = createAsyncThunk(
  "auth/initializeAuthListener",
  async (_, { dispatch }) => {
    return new Promise<void>((resolve) => {
      const unsubscribe = listenToAuthChanges(async (user) => {
        if (user) {
          const profile = await getExistingUser(user.uid);
          dispatch(setUser({ firebaseUser: user, profile }));
        } else {
          dispatch(clearUser());
        }
        dispatch(setInitialized(true));
        resolve();
      });
    });
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (
      state,
      action: PayloadAction<{ firebaseUser: User | null; profile: any | null }>
    ) => {
      state.firebaseUser = action.payload.firebaseUser;
      state.profile = action.payload.profile;
      state.error = null;
    },
    clearUser: (state) => {
      state.firebaseUser = null;
      state.profile = null;
    },
    setInitialized: (state, action: PayloadAction<boolean>) => {
      state.initialized = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(initializeAuthListener.pending, (state) => {
        state.loading = true;
      })
      .addCase(initializeAuthListener.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(initializeAuthListener.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Auth listener initialization failed.";
      });
  },
});

export const { setUser, clearUser, setInitialized } = authSlice.actions;

/**
 * Selectors — to access parts of auth state.
 */
export const selectAuth = (state: any) => state.auth;
export const selectUser = (state: any) => state.auth.firebaseUser;
export const selectProfile = (state: any) => state.auth.profile;
export const selectIsInitialized = (state: any) => state.auth.initialized;

export default authSlice.reducer;
