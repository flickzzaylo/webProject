<template>
    <div>
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
    </div>
  </template>
  
  <script>
    import http from "../../http-common";
    export default {
        name: "ListUsers",
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
        }
    }
  </script>