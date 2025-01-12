
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { PrepareReceiveResponse, ReceivePaymentResponse } from '@breeztech/react-native-breez-sdk-liquid';

const initialState: {
  prepareResponse?: PrepareReceiveResponse,
  receiveResponse?: ReceivePaymentResponse,
} = {}

export const receiveSlice = createSlice({
  name: 'info',
  initialState,
  reducers: {
    setReceive: (state, action: PayloadAction<Partial<typeof initialState>>) => {
      return {
        ...state,
        ...action.payload
      }
    }
  }
})

export const { setReceive } = receiveSlice.actions

export default receiveSlice.reducer
