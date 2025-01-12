import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Payment } from '@breeztech/react-native-breez-sdk-liquid';

const initialState: Payment[] = [];

export const paymentsSlice = createSlice({
  name: 'info',
  initialState,
  reducers: {
    setPayments: (_, action: PayloadAction<Payment[]>) => {
      return action.payload
    }
  }
})

export const { setPayments } = paymentsSlice.actions

export default paymentsSlice.reducer
