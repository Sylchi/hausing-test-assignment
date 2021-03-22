<template>
  <div class="modal-backdrop">
    <div class="modal">
      <i @click="$emit('close')" class="close">✖</i>
      <div class="title">
        <slot name="title" />
      </div>
      <slot></slot>
      <div class="actions">
        <slot name="actions" />
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    
  }
</script>

<style lang="scss" scoped>
.modal-backdrop{
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.199);
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;

  .modal{
    background: white;
    min-width: 300px;
    padding: 20px;
    position: relative;
    border-radius: 5px;

    .title{
      font-size: 1.2rem;
      font-weight: bold;
    }

    .actions{
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      margin-top: 10px;
      width: 100%;

      button {
        border: none;
        background: green;
        padding: 8px 15px;
      }
    }

    .close{
      position: absolute;
      right: 20px;
      font-size: 1.3rem;
      cursor: pointer;
    }
  }
}
</style>