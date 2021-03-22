<template>
  <Index />
</template>

<script>
import Index from './pages/Index.vue'

export default {
  name: 'App',
  components: { Index }
}
// This starter template is using Vue 3 experimental <script setup> SFCs
// Check out https://github.com/vuejs/rfcs/blob/script-setup-2/active-rfcs/0000-script-setup.md
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.content {
  max-width: 1400px;
  margin: 0 auto;
  padding: 20px;
}
</style>