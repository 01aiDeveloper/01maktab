import { configureStore } from "@reduxjs/toolkit"
import authReducer from "@/store/features/auth/auth-slice"

export const makeStore = () =>
  configureStore({
    reducer: {
      auth: authReducer,
    },
  })

export const store = makeStore()

export type AppStore = typeof store
export type RootState = ReturnType<AppStore["getState"]>
export type AppDispatch = AppStore["dispatch"]
