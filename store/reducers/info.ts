import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { GetInfoResponse } from '@breeztech/react-native-breez-sdk-liquid';

type Info = GetInfoResponse | null;

export const infoSlice = createSlice({
  name: 'info',
  initialState: null as Info,
  reducers: {
    setInfo: (_, action: PayloadAction<Info>) => {
      return action.payload
    }
  }
})

export const { setInfo } = infoSlice.actions

export default infoSlice.reducer
