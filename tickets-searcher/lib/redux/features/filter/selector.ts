const selectFilterModule = (state) => state.filter

export const selectNameFilter = (state) => selectFilterModule(state).name
export const selectGenreFilter = (state) => selectFilterModule(state).genre
export const selectCinemaFilter = (state) => selectFilterModule(state).cinema
