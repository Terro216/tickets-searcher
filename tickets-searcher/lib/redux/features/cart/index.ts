import { createSlice } from '@reduxjs/toolkit'

interface State {
  films: {
    [filmId: number]: number
  }
  counter: number
}

const initialState: State = {
  films: {},
  counter: 0,
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addTicket: (state, { payload }) => {
      if (!state.films[payload]) {
        state.films[payload] = 0
      }
      state.films[payload] += 1
      state.counter += 1
    },
    removeTicket: (state, { payload }) => {
      if (!state.films[payload]) {
        state.films[payload] = 0
      } else {
        state.films[payload] -= 1
      }
      state.counter -= 1
    },
    removeFilm: (state, { payload }) => {
      const currentFilmTickets = state.films[payload] || 0
      state.films[payload] = 0
      state.counter -= currentFilmTickets
    },
    reset: () => initialState,
  },
})

export const cartReducer = cartSlice.reducer
export const cartActions = cartSlice.actions
