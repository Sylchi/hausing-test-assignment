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
    name: "Title",
    field: 'title',
  },{
    name: "Priority",
    field: 'priority',
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