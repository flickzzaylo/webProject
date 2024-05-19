<template>
  <div class="row justify-content-center">
    <div class="col-md-8">
      <div class="text-center">
        <h3 class="text-white mb-3" style="background-color: #007bff; padding: 10px;">Выберите учебную дисциплину</h3>
  <ul class="list-group">
    <li class="list-group-item" v-for="(tdisc,index) in teacherDisciplines" :key="index">
      <router-link :to="{
        name: 'listTasksByD',
        params: {id: tdisc.id}
      }" class="nav-link text-dark">
        <span style="font-family: Arial, sans-serif; font-size: 18px; text-decoration: none;">
          {{tdisc.teacher_name}} - {{tdisc.discipline_name}}
        </span>
      </router-link>
    </li>
  </ul>
      </div>
    </div>
  </div>
</template>

<script>
import http from "../../http-common";
import '@/components/styles/listStyle.css'
export default {
  name: "ListTeacherDisciplinesInTask",
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