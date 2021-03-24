<template>
<table>
  <thead>
    <tr>
      <th v-for="{ name, sort } of columns" :key="name" @click="changeSortingOrder(name)"
        :style="{
          cursor: !!sort ? 'pointer' : ''
        }"
      >{{name}}</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="[rowIndex, rowData] of Object.entries(sortedData)" :key="rowIndex">
      <td v-for="[columnIndex, { field, format }] of Object.entries(columns)" :key="columnIndex">
        {{format ? format(rowData[field]) : rowData[field]}}
      </td>
    </tr>
  </tbody>
</table>
</template>

<script>
import { reactive, toRefs, computed } from 'vue'

  export default {
    name: 'Table',
    props: {
      columns: Array,
      data: Array
    },
    setup(props) {
      const state = reactive({
        sort: {
          fieldName: null,
          direction: null
        }
      })

      const changeSortingOrder = (name) => {
        if(state.sort.fieldName === name) {
          state.sort.direction = state.sort.direction === 'ASC' ? 'DESC' : 'ASC';
        } else {
          state.sort.direction = 'ASC';
        }
        state.sort.fieldName = name;
      }

      const sortedData = computed(() => {
        if(state.sort.fieldName === null) return props.data;
        const column = props.columns.find(column => column.name === state.sort.fieldName);
        if(column === null || typeof column.sort !== 'function') return props.data;
        if(state.sort.direction === null) state.sort.direction = 'ASC';
        const clonedData = [...props.data];
        clonedData.sort(column.sort);
        return state.sort.direction === 'DESC' ? clonedData.reverse() : clonedData;        
      })

      return { ...toRefs(state), changeSortingOrder, sortedData }
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
  }
  tr{
    &:nth-child(even){
      background: rgb(230, 230, 230);
    }
  }
}
</style>