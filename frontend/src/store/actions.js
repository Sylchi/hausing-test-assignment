const apiUrl = import.meta.env.VITE_API_URL; 

export default {
  fetchTickets: async ({ commit }, options) => {
    let url = `${apiUrl}/tickets`
    if(options && typeof options.params === 'object'){
      url += "?" + new URLSearchParams(params).toString();
    }
    const res = await fetch(url);
    const tickets = await res.json();
    commit('addTickets', tickets);
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
    commit('addTicket', createRes);
  },
  updateTicket: ({ commit }, options) => {

  }
}