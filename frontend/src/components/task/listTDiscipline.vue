<template>
  <div>
      Выберите учебную дисциплину
  </div>
  <ul>
    <li v-for="(tdisc,index) in teacherDisciplines" :key="index">
      <router-link :to="{
        name: 'listTasksByD',
        params: {id: tdisc.id}
      }">
      {{tdisc.teacher_name}} - {{tdisc.discipline_name}}
      </router-link>
    </li>
  </ul>
</template>

<script>
import http from "../../http-common";
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