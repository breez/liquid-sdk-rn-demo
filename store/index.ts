import infoReducer from './reducers/info';
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    info: infoReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store
