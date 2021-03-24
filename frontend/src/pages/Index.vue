<template>
<main class="content">
  <div class="title">
    <h1>{{content.title}}</h1>
    <button @click="$store.commit('toggleTicketEditorModal', true)">{{content.createLabel}}</button>
  </div>
  <Table :columns="columns" :data="$store.state.loadedTickets" :actions="['edit']" @edit="loadTicketEditorValues" />
  <TicketEditor ref="ticketEditor" />
</main>
</template>

<script>
import { ref } from 'vue'
import { useStore } from 'vuex'
import TicketEditor from '../components/TicketEditor.vue'
import Table from '../components/Table.vue'

  const content = {
    title: "Service Desk",
    createLabel: "Create ticket"
  }

  const priorityMap = {
    "1": "Highest",
    "2": "High",
    "3": "Medium",
    "4": "Low",
    "5": "Lowest"
  }

  const columns = [{
    name: "ID",
    field: 'id',
  },{
    name: "Email",
    field: 'email',
  },{
    name: "Created",
    field: 'createdAt',
    sort: (val1, val2) => {
      new Date(val2).getTime() - new Date(val1).getTime()
    },
    format: val => new Date(val).toLocaleDateString()
  },{
    name: "Title",
    field: 'title',
  },{
    name: "Priority",
    field: 'priority',
    sort: (val1, val2) => val1.priority - val2.priority,
    format: val => priorityMap[val.toString()]
  },{
    name: "Status",
    field: 'closedAt',
    sort: (val1, val2) => val1.closedAt ? val2.closedAt ? 0 : -1 : 0,
    format: val => !!val ? 'Closed' : 'Open'
  }]

  export default {
    name: 'Index',
    components: { TicketEditor, Table },
    setup() {
      const store = useStore();
      store.dispatch('fetchTickets');
      const ticketEditor = ref(null);

      const loadTicketEditorValues = item => {
        ticketEditor.value.loadValues(item);
      }

      return { content, columns, ticketEditor, loadTicketEditorValues }
    }
  }
</script>

<style lang="scss" scoped>
.title{
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  button{
    background: rgb(17, 77, 97);
    border: none;
    color: white;
    font-weight: medium;
    font-size: 1.2em;
    padding: 10px 15px;
    cursor: pointer;

    &:hover{
      background: rgb(20, 101, 128);
    }
  }
}
</style>