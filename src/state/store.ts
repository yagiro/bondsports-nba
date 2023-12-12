import { configureStore } from '@reduxjs/toolkit'
import { apiSlice } from '../api/apiSlice'
import inputReducer from './slices/inputSlice'

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    input: inputReducer,
  },
  middleware: getDefaultMiddleware => (
    getDefaultMiddleware().concat(apiSlice.middleware)
  )
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
