const selectCartModule = (state) => state.cart

export const selectTicketsAmount = (state) => selectCartModule(state).counter
export const selectTicketsByFilmId = (state, id: string) => selectCartModule(state).films?.[id] || 0
