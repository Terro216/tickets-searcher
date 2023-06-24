import { configureStore } from '@reduxjs/toolkit'
import { cartReducer } from './features/cart'
// import { logger } from "@/redux/middleware/logger";
import { movieApi } from './services/movieApi'
import { filterReducer } from './features/filter'

export const store = configureStore({
  reducer: {
    [movieApi.reducerPath]: movieApi.reducer,
    cart: cartReducer,
    filter: filterReducer,
  },
  //   middleware: (getDefaultMiddleware) =>
  //     getDefaultMiddleware().concat([movieApi.middleware, logger]),
  devTools: process.env.NODE_ENV !== 'production',
})
