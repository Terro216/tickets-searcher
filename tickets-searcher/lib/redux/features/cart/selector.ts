import { RootState } from '../../store'

const selectCartModule = (state: RootState) => state.cart

export const selectTicketsAmount = (state: RootState) => selectCartModule(state).counter
export const selectTicketsByFilmId = (state: RootState, id: string) =>
  selectCartModule(state).films?.[id] || 0
export const selectCartFilms = (state: RootState) => selectCartModule(state).films
