<template>
    <div v-if="this.role===3" class="container">
      <div class="row justify-content-center">
        <div class="col-md-8">
          <div class="text-center">
            <h3 class="text-white mb-3" style="background-color: #007bff; padding: 10px;">Список преподавателей</h3>
      <ul class="list-group">
        <li class="list-group-item" v-for="(teacher, index) in teachers" :key="index">
          <router-link :to="{
                  name: 'teacher-details',
                  params: { id: teacher.id }
              }" class="nav-link text-dark">
            <span style="font-family: Arial, sans-serif; font-size: 18px; text-decoration: none;">
              {{teacher.name}}
            </span>
          </router-link>
        </li>
      </ul>
      <router-link class="btn btn-primary btn-block mt-3" to="/addTeacher">Добавить преподавателя</router-link>
    </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
    import http from "../../http-common";
    import {userRole} from "@/mixins/currentUser";
    import '@/components/styles/listStyle.css'
    export default {
        name: "ListTeachers",
        mixins: [userRole],
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
          this.currentUserRole();
            this.getTeachers();
        }
    }
  </script>