<template>
<table>
  <thead>
    <tr>
      <th v-for="{ name } of columns" :key="name">{{name}}</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="[rowIndex, rowData] of Object.entries(data)" :key="rowIndex">
      <td v-for="[columnIndex, { field }] of Object.entries(columns)" :key="columnIndex">
        {{rowData[field]}}
      </td>
    </tr>
  </tbody>
</table>
</template>

<script>
  export default {
    name: 'Table',
    props: {
      columns: Array,
      data: Array
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