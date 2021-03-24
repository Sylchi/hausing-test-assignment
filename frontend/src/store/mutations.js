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
  },
  updateTicket: (state, ticket) => {
    if(!ticket) return;
    const ticketToUpdate = state.loadedTickets.find(item => item.id === ticket.id);
    if(!ticketToUpdate) return;
    Object.assign(ticketToUpdate, ticket);
  }
}