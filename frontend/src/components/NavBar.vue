<template>
  <div id="app" class="container-fluid">
    <div class="row">
      <div class="col-2 bg-primary sidebar ps-0">
        <ul class="nav flex-column w-100">
          <li class="nav-item w-100" v-if="this.role===3">
            <router-link class="nav-link" to="/compiler">Компилятор</router-link>
          </li>
          <li class="nav-item w-100" v-if="this.role===3 || this.role===1">
            <router-link class="nav-link" to="/listDisciplines">Дисциплины</router-link>
          </li>
          <li class="nav-item w-100" v-if="this.role===3">
            <router-link class="nav-link" to="/listProgLang">Языки программирования</router-link>
          </li>
          <li class="nav-item w-100" v-if="this.role===3">
            <router-link class="nav-link" to="/listRoles">Роли</router-link>
          </li>
          <li class="nav-item w-100" v-if="this.role===3">
            <router-link class="nav-link" to="/listUsers">Пользователи</router-link>
          </li>
          <li class="nav-item w-100" v-if="this.role===3">
            <router-link class="nav-link" to="/listTeachers">Преподаватели</router-link>
          </li>
          <li class="nav-item w-100" v-if="this.role===3">
            <router-link class="nav-link" to="/listTeacherDisciplines">Дисциплины преподавателей</router-link>
          </li>
          <li class="nav-item w-100">
            <router-link class="nav-link" to="/listTasks">Задачи</router-link>
          </li>
          <li class="nav-item w-100">
            <a class="nav-link" href="#" @click.prevent="logOut" style="color: mediumaquamarine !important;">Выйти из профиля <br>{{currentUser.login}}</a>
          </li>
        </ul>
      </div>
      <div class="col-9">
        <router-view></router-view>
      </div>
    </div>
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
    // if(this.role===null){
    //   this.logOut();
    // }
  }
};
</script>

<style>
.sidebar {
  height: 100vh !important;
  overflow-y: auto !important;
  padding-top: 0 !important;
  justify-content: space-between !important;
  flex-direction: column !important;
}

.nav-link {
  font-family: 'cursive', sans-serif !important;
  font-size: 1.2rem !important;
  color: lightgray !important; /* Розовый цвет */
  width: 100% !important;
  text-align: left !important;
}

.nav-item {
  flex-grow: 1 !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
}

.nav-link:hover {
  color: aquamarine !important; /* Голубой цвет */
  text-decoration: none !important;
}
</style>