<template>
<main class="content">
  <div class="title">
    <h1>{{content.title}}</h1>
    <button @click="$store.commit('toggleTicketEditorModal', true)">{{content.createLabel}}</button>
  </div>
  <Table :columns="columns" :data="$store.state.loadedTickets" />
  <TickerEditor />
</main>
</template>

<script>
import { useStore } from 'vuex'
import TickerEditor from '../components/TicketEditor.vue'
import Table from '../components/Table.vue'

  const content = {
    title: "Service Desk",
    createLabel: "Create ticket"
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
      new Date(val1).getTime() - new Date(val2).getTime()
    },
    format: val => new Date(val).toLocaleDateString()
  },{
    name: "Title",
    field: 'title',
  },{
    name: "Priority",
    field: 'priority',
    sort: (val1, val2) => val1.priority - val2.priority
  },{
    name: "Status",
    field: 'closedAt',
    sort: (val1, val2) => { 
      return (val1 === val2)? 0 : val1? -1 : 1
    },
    format: val => !!val ? 'Closed' : 'Open'
  }]

  export default {
    name: 'Index',
    components: { TickerEditor, Table },
    setup() {
      const store = useStore();
      store.dispatch('fetchTickets');
      return { content, columns }
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