<template>
    <div id="app">
      <div v-if="this.role===3">
        <a class="navbar-brand"><router-link class="item" to="/compiler">Компилятор</router-link></a>
        <a>---</a>
      </div>
      <div v-if="this.role===3 || this.role===1">
      <a class="navbar-brand"><router-link class="item" to="/listDisciplines">Дисциплины</router-link></a>
      <a>---</a>
      </div>
      <div v-if="this.role===3">
      <a class="navbar-brand"><router-link class="item" to="/listProgLang">Языки программирования</router-link></a>
        <a>---</a>
      </div>
      <div v-if="this.role===3">
        <a class="navbar-brand"><router-link class="item" to="/listRoles">Роли</router-link></a>
        <a>---</a>
      </div>
      <div v-if="this.role===3">
        <a class="navbar-brand"><router-link class="item" to="/listUsers">Пользователи</router-link></a>
        <a>---</a>
      </div>
      <div v-if="this.role===3">
        <a class="navbar-brand"><router-link class="item" to="/listTeachers">Преподаватели</router-link></a>
        <a>---</a>
      </div>
      <div v-if="this.role===3">
        <a class="navbar-brand"><router-link class="item" to="/listTeacherDisciplines">Дисциплины преподавателей</router-link></a>
        <a>---</a>
      </div>
        <a class="navbar-brand"><router-link class="item" to="/listTasks">Задачи</router-link></a>
        <a>---</a>
        <a class="navbar-brand">{{currentUser.login}} <a href @click.prevent="logOut"> Выйти</a></a>
    </div>
</template>

<script>
import {userRole} from "@/mixins/currentUser";

export default {
  name: "NavBar",
  mixins: [userRole],
  data() {
    return {};
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  methods: {
    logOut() {
      this.$store.dispatch('auth/logout'); // обращаемся к методу logout, который определён в auth.service.js
      window.location.href = '/'; // // Используем такую конструкцию, а не this.$router.push, так как требуется перезагрузить страницу для обновления локального хранилища
    }
  },
  mounted() {
    this.currentUserRole();
  }
};
</script>