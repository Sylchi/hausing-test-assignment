import { createStore } from "vuex";

const apiUrl = 'http://localhost:3000/api/v1'; 

export default createStore({
  state: {
    showTicketEditor: false,
    loadedTickets: [],
  },
  mutations: {
    addTicket(state, ticket) {
      state.loadedTickets.unshift(ticket);
    },
    toggleTicketEditorModal(state, value){
      state.showTicketEditor = !!value ? value : !state.showTicketEditor;
    }
  },
  actions: {
    fetchTickets: ({ commit }, options) => {

    },
    createTicket: async ({ commit }, { data, options={}}) => {
      const createRes = await fetch(`${apiUrl}/tickets`, { 
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        ...options
      }).then(res => res.json());
      console.log(createRes);

    },
    updateTicket: ({ commit }, options) => {

    }
  },
});