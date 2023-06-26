import { configureStore } from '@reduxjs/toolkit'
// import { logger } from "@/redux/middleware/logger";
import { movieApi } from './services/movieApi'
import { cinemaApi } from './services/cinemaApi'
import { filterReducer } from './features/filter'
import { cartReducer } from './features/cart'
import { reviewsApi } from './services/reviewsApi'

export const store = configureStore({
  reducer: {
    [movieApi.reducerPath]: movieApi.reducer,
    [cinemaApi.reducerPath]: cinemaApi.reducer,
    [reviewsApi.reducerPath]: reviewsApi.reducer,
    cart: cartReducer,
    filter: filterReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([movieApi.middleware, cinemaApi.middleware, reviewsApi.middleware]),
  //   middleware: (getDefaultMiddleware) =>
  //     getDefaultMiddleware().concat([movieApi.middleware, logger]),
  devTools: process.env.NODE_ENV !== 'production',
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
