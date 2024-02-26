<template>
    <div class="col-sm-6">
      Учебные дисциплины преподавателей
      <table border="1" class="table table-bordered table-striped mt-3">
        <thead class="table-primary">
          <tr>
              <th>№</th>
              <th>Преподаватель</th>
              <th>Дисциплина</th>
              <th>Действие</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(el, index) in teacherDisciplines" :key="index">
            <td>{{ index + 1 }}</td>
            <td>{{ el.teacher_name}}</td>
            <td>{{ el.discipline_name}}</td>
            <td>
              <button v-on:click="deleteTeacherDiscipline(el.id)">Удалить</button>
            </td>
          </tr>
        </tbody>
      </table>
      <router-link to="/addTeacherDiscipline">Добавить новую запись</router-link>
    </div>
  </template>
  
  <script>
  import http from "../../http-common";
  export default {
    name: "ListTeacherDisciplines",
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
      this.getTeacherDisciplines();
    }
  }
  </script>
  