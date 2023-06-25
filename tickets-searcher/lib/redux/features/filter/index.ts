import { createSlice } from '@reduxjs/toolkit'
import { Cinema } from '../../services/cinemaApi'
import { Genre } from '../../services/movieApi'

interface State {
  name: string
  genre: Genre
  cinema: Cinema
}

const initialState: State = {
  name: '',
  genre: '',
  cinema: { id: '', name: '', movieIds: [] },
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
