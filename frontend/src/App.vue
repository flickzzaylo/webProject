<template>
  <div id="app">
    <compiler/>
    <!-- <router-view/> -->
  </div>
</template>

<script>
import compiler from './components/compiler/compiler.vue'

export default {
  name: 'App',
  components: {
    compiler: compiler
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
