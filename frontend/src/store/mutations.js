export default {
  addTicket: (state, ticket) => {
    const newTickets = [...state.loadedTickets, ticket];
    state.loadedTickets.splice(0, state.loadedTickets.length);
    state.loadedTickets.push(...newTickets);
  },
  addTickets: (state, tickets) => {
    state.loadedTickets = tickets;
  },
  toggleTicketEditorModal: (state, value) => {
    state.showTicketEditor = !!value ? value : !state.showTicketEditor;
  }
}