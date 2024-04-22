<template>
  <div v-if="this.role===3">
    Список пользователей
    <ul>
      <li v-for="(user, index) in users" :key="index">
        <router-link :to="{
                  name: 'user-details',
                  params: { id: user.id }
              }">
          {{user.login}}
        </router-link>
      </li>
    </ul>
    <div><router-link class="item" to="/addUser">Добавить пользователя</router-link></div>
  </div>
</template>

<script>
import http from "../../http-common";
import {userRole} from "@/mixins/currentUser"
export default {
  name: "ListUsers",
  mixins: [userRole],
  data() {
    return {
      users: []
    };
  },
  methods: {
    getUsers() {
      http
          .get("/listUsers")
          .then(response => {
            this.users = response.data;
          })
          .catch(e => {
            console.log(e);
          });
    }
  },
  mounted() {
    this.getUsers();
    this.currentUserRole();
  }
}
</script>