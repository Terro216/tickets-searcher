import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface State {
  films: {
    [filmId: string]: number
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
    addTicket: (state, { payload }: PayloadAction<string>) => {
      if (!state.films[payload]) {
        state.films[payload] = 0
      }
      if (state.films[payload] < 30) {
        state.films[payload] += 1
        state.counter += 1
      }
    },
    removeTicket: (state, { payload }: PayloadAction<string>) => {
      if (!state.films[payload]) {
        state.films[payload] = 0
      } else {
        state.films[payload] -= 1
        if (state.films[payload] === 0) delete state.films[payload]
      }
      state.counter -= 1
    },
    removeFilm: (state, { payload }: PayloadAction<string>) => {
      const currentFilmTickets = state.films[payload] || 0
      state.films[payload] = 0
      delete state.films[payload]
      state.counter -= currentFilmTickets
    },
    reset: () => initialState,
  },
})

export const cartReducer = cartSlice.reducer
export const cartActions = cartSlice.actions
