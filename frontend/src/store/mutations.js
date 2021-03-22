export default {
  addTicket: (state, ticket) => {
    state.loadedTickets.unshift(ticket);
  },
  addTickets: (state, tickets) => {
    state.loadedTickets = tickets;
  },
  toggleTicketEditorModal: (state, value) => {
    state.showTicketEditor = !!value ? value : !state.showTicketEditor;
  }
}