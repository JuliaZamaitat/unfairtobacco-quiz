<template>
  <div id="app">
    <Diashows />
  </div>
</template>

<script>
import Diashows from './components/Diashows.vue'

export default {
  name: 'App',
  components: {
    Diashows
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
