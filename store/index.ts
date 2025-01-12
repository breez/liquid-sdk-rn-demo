import infoReducer from './reducers/info';
import receiveReducer from './reducers/receive';
import paymentsReducer from './reducers/payments';
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    info: infoReducer,
    receive: receiveReducer,
    payments: paymentsReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store
