<template>
    <div v-if="this.role===3" class="container">
      <div class="row justify-content-center">
        <div class="col-md-8">
          <div class="text-center">
            <h3 class="text-white mb-3" style="background-color: #007bff; padding: 10px;">Учебные дисциплины преподавателей</h3>
            <table class="table table-bordered table-striped table-hover mt-3">
              <thead class="thead-dark">
              <tr>
                <th scope="col">№</th>
                <th scope="col">Преподаватель</th>
                <th scope="col">Дисциплина</th>
                <th scope="col">Действие</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(el, index) in teacherDisciplines" :key="index">
                <th scope="row">{{ index + 1 }}</th>
                <td>{{ el.teacher_name }}</td>
                <td>{{ el.discipline_name }}</td>
                <td>
                  <button v-on:click="deleteTeacherDiscipline(el.id)" class="btn btn-sm btn-outline-danger">Удалить</button>
                </td>
              </tr>
              </tbody>
            </table>
      <router-link class="btn btn-primary btn-block mt-3" to="/addTeacherDiscipline">Добавить новую запись</router-link>
    </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import http from "../../http-common";
  import {userRole} from "@/mixins/currentUser";
  export default {
    name: "ListTeacherDisciplines",
    mixins: [userRole],
    data() {
      return {
        teacherDisciplines: []
      };
    },
    methods: {
      getTeacherDisciplines() {
        http
            .get("/listTeacherDisciplines")
            .then(response => {
              this.teacherDisciplines = response.data;
            })
            .catch(e => {
              console.log(e);
            });
      },
      deleteTeacherDiscipline(teacher_discipline_id) {
        console.log(teacher_discipline_id)
        http
            .post(`/deleteTeacherDiscipline/${teacher_discipline_id}`)
            .then(() => {
              this.getTeacherDisciplines();
            })
            .catch(e => {
              console.log(e);
            });
      }
    },
    mounted() {
      this.currentUserRole();
      this.getTeacherDisciplines();
    }
  }
  </script>
  