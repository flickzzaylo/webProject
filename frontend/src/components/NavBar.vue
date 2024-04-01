<template>
    <div id="app">
        <a class="navbar-brand"><router-link class="item" to="/compiler">Компилятор</router-link></a>
        <a>---</a>
        <a class="navbar-brand"><router-link class="item" to="/listDisciplines">Дисциплины</router-link></a>
        <a>---</a>
        <a class="navbar-brand"><router-link class="item" to="/listProgLang">Языки программирования</router-link></a>
        <a>---</a>
        <a class="navbar-brand"><router-link class="item" to="/listRoles">Роли</router-link></a>
        <a>---</a>
        <a class="navbar-brand"><router-link class="item" to="/listUsers">Пользователи</router-link></a>
        <a>---</a>
        <a class="navbar-brand"><router-link class="item" to="/listTeachers">Преподаватели</router-link></a>
        <a>---</a>
        <a class="navbar-brand"><router-link class="item" to="/listTeacherDisciplines">Дисциплины преподавателей</router-link></a>
        <a>---</a>
        <a class="navbar-brand"><router-link class="item" to="/listTasks">Задачи</router-link></a>
        <a>---</a>
        <a class="navbar-brand">{{currentUser.login}} <a href @click.prevent="logOut"> Выйти</a></a>
    </div>
</template>

<script>
export default {
  name: "NavBar",
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
      window.location.href = '/login'; // // Используем такую конструкцию, а не this.$router.push, так как требуется перезагрузить страницу для обновления локального хранилища
    }
  }
};
</script>