import { RootState } from '../../store'

const selectFilterModule = (state: RootState) => state.filter

export const selectNameFilter = (state: RootState) => selectFilterModule(state).name
export const selectGenreFilter = (state: RootState) => selectFilterModule(state).genre
export const selectCinemaFilter = (state: RootState) => selectFilterModule(state).cinema
