<template>
  <div id="app">
    <!-- <compiler/> -->
    <NavBar/>
    <router-view />
  </div>
</template>

<script>
// import compiler from './components/compiler/compiler.vue'
import NavBar from './components/NavBar'

export default {
  name: 'App',
  components: {
    // compiler: compiler
    NavBar: NavBar
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
