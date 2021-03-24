const apiUrl = import.meta.env.VITE_API_URL; 

const sendRequest = async (path, method='GET', body) => {
  try {
    return await fetch(`${apiUrl}${path}`, { 
      method,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body
    }).then(res => res.json());
  } catch (err) {
    console.error(err);
    return false;
  }
}

export default {
  fetchTickets: async ({ commit }, options) => {
    let url = `/tickets`
    if(options && typeof options.params === 'object'){
      url += "?" + new URLSearchParams(params).toString();
    }
    const tickets = await sendRequest(url);
    if(tickets) commit('addTickets', tickets);
    return tickets;
  },
  createTicket: async ({ commit }, { data }) => {
    const ticket = await sendRequest('/tickets', 'POST', JSON.stringify(data));
    if(ticket) commit('addTicket', ticket);
    return ticket;
  },
  updateTicket: async ({ commit }, { data }) => {
    const id = data.id;
    delete data.id;
    const ticket = await sendRequest(`/tickets/${id}`, 'PATCH', JSON.stringify(data));
    if(ticket) commit('updateTicket', ticket);
    return ticket;
  },
  closeTicket: async ({ commit }, { data }) => {
    const id = data.id;
    delete data.id;
    const ticket = await sendRequest(`/tickets/${id}`, 'DELETE');
    if(ticket) commit('updateTicket', ticket);
    return ticket;
  }
}