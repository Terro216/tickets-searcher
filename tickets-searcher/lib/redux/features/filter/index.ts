import { createSlice } from '@reduxjs/toolkit'

type genreList = any[]
type cinemasList = any[]

interface State {
  name: string
  genre: string
  cinema: string
}

const initialState: State = {
  name: '',
  genre: '',
  cinema: '',
}

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setName: (state, { payload }) => {
      state.name = payload
    },
    setGenre: (state, { payload }) => {
      state.genre = payload
    },
    setCinema: (state, { payload }) => {
      state.cinema = payload
    },
    reset: () => initialState,
  },
})

export const filterReducer = filterSlice.reducer
export const filterActions = filterSlice.actions
