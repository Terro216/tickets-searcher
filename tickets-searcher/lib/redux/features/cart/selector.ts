const selectCartModule = (state) => state.cart

export const selectTicketsAmount = (state) => selectCartModule(state).counter
export const selectFilm = (state, id: number) => selectCartModule(state).films[id]
