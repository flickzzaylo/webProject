<template>
  <div id="app">
    <div v-if="!currentUser">
      <LoginUser/>
    </div>
    <div v-else>
      <NavBar/>
    </div>
<!--    <router-view />-->
  </div>
</template>

<script>
import NavBar from './components/NavBar'
import LoginUser from "@/components/authorization/Login.vue";

export default {
  name: 'App',
  components: {
    NavBar: NavBar,
    LoginUser: LoginUser
  },
  computed: {
    currentUser(){
      return this.$store.state.auth.user;
    }
  }
}


</script>

<!--<style>-->
<!--#app {-->
<!--  font-family: Avenir, Helvetica, Arial, sans-serif;-->
<!--  -webkit-font-smoothing: antialiased;-->
<!--  -moz-osx-font-smoothing: grayscale;-->
<!--  text-align: center;-->
<!--  color: #2c3e50;-->
<!--  margin-top: 0px;-->
<!--}-->
<!--</style>-->
