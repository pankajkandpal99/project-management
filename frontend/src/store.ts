import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/auth.slice";
import userReducer from "./features/user/user.slice";
import projectReducer from "./features/project/project.slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    project: projectReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
