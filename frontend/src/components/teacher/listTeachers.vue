<template>
    <div>
      Список преподавателей
      <ul>
        <li v-for="(teacher, index) in teachers" :key="index">
          <router-link :to="{
                  name: 'teacher-details',
                  params: { id: teacher.id }
              }">
              {{teacher.name}}
          </router-link>
        </li>
      </ul>
      <div><router-link class="item" to="/addTeacher">Добавить преподавателя</router-link></div>
    </div>
  </template>
  
  <script>
    import http from "../../http-common";
    export default {
        name: "ListTeachers",
        data() {
            return {
                teachers: []
            };
        },
        methods: {
            getTeachers() {
                http
                    .get("/listTeachers")
                    .then(response => {
                        this.teachers = response.data;
                    })
                    .catch(e => {
                        console.log(e);
                    });
            }
        },
        mounted() {
            this.getTeachers();
        }
    }
  </script>