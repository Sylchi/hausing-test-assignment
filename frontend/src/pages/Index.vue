<template>
<main class="content">
  <div class="title">
    <h1>{{content.title}}</h1>
    <button @click="$store.commit('toggleTicketEditorModal', true)">Create ticket</button>
    <TickerEditor />
  </div>
</main>
</template>

<script>
import TickerEditor from '../components/TicketEditor.vue'

  const content = {
    title: "Service Desk"
  }

  export default {
    name: 'Index',
    components: { TickerEditor },
    setup() {

      return { content }
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