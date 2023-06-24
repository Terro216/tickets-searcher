import { configureStore } from '@reduxjs/toolkit'
import { cartReducer } from './features/cart'
// import { logger } from "@/redux/middleware/logger";
import { movieApi } from './services/movieApi'
import { cinemaApi } from './services/cinemaApi'
import { filterReducer } from './features/filter'

export const store = configureStore({
  reducer: {
    [movieApi.reducerPath]: movieApi.reducer,
    [cinemaApi.reducerPath]: cinemaApi.reducer,
    cart: cartReducer,
    filter: filterReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([movieApi.middleware, cinemaApi.middleware]),
  //   middleware: (getDefaultMiddleware) =>
  //     getDefaultMiddleware().concat([movieApi.middleware, logger]),
  devTools: process.env.NODE_ENV !== 'production',
})
