<template>
    <div v-if="this.role===3" class="container">
      <div class="row justify-content-center">
        <div class="col-md-8">
          <div class="text-center">
            <h3 class="text-white mb-3" style="background-color: #007bff; padding: 10px;">Назначение преподавателю учебной дисциплины</h3>
      <form @submit="addTeacherDiscipline" class="text-left">
        <div class="form-group">
          <label for="name" class="text-dark">Преподаватель:</label>
          <select class="form-control form-control-dark" required v-model="teacher_discipline.teacher_id" @change="teacherChange">
            <option value="" disabled selected>Выберите преподавателя</option>
            <option v-for="teacher in teachers" v-bind:key="teacher.id" v-bind:value="teacher.id">
              {{teacher.name}}
            </option>
          </select>
        </div>
        <div class="form-group">
          <label for="name" class="text-dark">Дисциплина:</label>
          <select required v-model="teacher_discipline.discipline_id" class="form-control form-control-dark">
            <option value="" disabled selected>Выберите учебную дисциплину</option>
            <option v-for="discipline in disciplines" v-bind:key="discipline.id" v-bind:value="discipline.id">
              {{discipline.name}}
            </option>
          </select>
        </div>
        <div>
          <button type="submit" value="Добавить" class="btn btn-primary btn-block mt-3">Добавить</button>
        </div>
      </form>
    </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
    import http from "../../http-common";
    import {userRole} from "@/mixins/currentUser";
    export default {
      name: "AddTeacherDiscipline",
      mixins: [userRole],
      data() {
        return {
          teacher_discipline: {
            teacher_id: null,
            discipline_id: null
          },
          teachers: [],
          disciplines: []
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
        },
        getDisciplinesNotTeacher() {
          http
              .get("/disciplinesNotTeacher/" + this.teacher_discipline.teacher_id)
              .then(response => {
                this.disciplines = response.data;
              })
              .catch(e => {
                console.log(e);
              });
        },
        teacherChange() {
          this.getDisciplinesNotTeacher();
        },
        addTeacherDiscipline(e) {
          e.preventDefault();
          var data = this.teacher_discipline;
          http
              .post("/createTeacherDiscipline", data)
              .then(() => {
                this.$router.push('/listTeacherDisciplines');
              })
              .catch(e => {
                console.log(e);
              });
        },
      },
      mounted(){
        this.currentUserRole();
        this.getTeachers();
      }
    }
  </script>