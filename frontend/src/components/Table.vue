<template>
<table>
  <thead>
    <tr>
      <th v-for="{ name, sort } of columns" :key="name" @click="!!sort ? changeSortingOrder(name) : ''"
        :style="{
          cursor: !!sort ? 'pointer' : ''
        }"
      >{{name}}</th>
      <th v-if="actions">Actions</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="[rowIndex, rowData] of Object.entries(sortedData)" :key="rowIndex">
      <td v-for="[columnIndex, { field, format }] of Object.entries(columns)" :key="columnIndex">
        {{format ? format(rowData[field]) : rowData[field]}}
      </td>
      <td v-if="actions">
        <button v-for="action of actions" :key="action" @click="$emit(action, rowData)">{{action}}</button>
      </td>
    </tr>
    <tr v-if="!sortedData || sortedData.length === 0">
      <td>No data to show</td>
    </tr>
  </tbody>
</table>
</template>

<script>
import { reactive, toRefs } from 'vue'

  export default {
    name: 'Table',
    props: {
      columns: Array,
      data: Array,
      actions: Array
    },
    setup() {
      const state = reactive({
        sort: {
          fieldName: 'createdAt',
          direction: 'ASC'
        },
      })

      const changeSortingOrder = (name) => {
        if(state.sort.fieldName === name) {
          state.sort.direction = state.sort.direction === 'ASC' ? 'DESC' : 'ASC';
        } else {
          state.sort.direction = 'ASC';
        }
        state.sort.fieldName = name;
      }

      return { ...toRefs(state), changeSortingOrder }
    },
    computed: {
      sortedData() {
        const column = this.$props.columns.find(column => column.name === this.sort.fieldName);
        if(!column || typeof column.sort !== 'function') return this.$props.data;
        const sortedData = [...this.$props.data].sort(column.sort);
        return this.sort.direction === 'DESC' ? sortedData.reverse() : sortedData;  
      }
    }
  }
</script>

<style lang="scss" scoped>
table{
  width: 100%;
  border-collapse: collapse;
  text-align: left;
  th, td{
    padding: 5px;

    button{
      text-transform: capitalize;
    }
  }
  tr{
    &:nth-child(even){
      background: rgb(230, 230, 230);
    }
  }
}
</style>