<template>
  <div>
    Выберите задание
  </div>
  <ul>
    <li v-for="(taskByDisc,index) in tasksByDiscipline" :key="index">
      <router-link :to="{
      name:'tasksByUsers',
      params: {teacherDId: this.teacher_discipline_id, id: taskByDisc.id}
      }">
      {{taskByDisc.name}} {{taskByDisc.description}}
      </router-link>
    </li>
  </ul>
</template>

<script>
import http from "../../http-common";
export default {
  name: "listTasksByD",
  props: ['id'],
  data(){
    return{
      tasksByDiscipline: [],
      teacher_discipline_id: null
    }
  },
  methods: {
    getTasksByDiscipline(){
      console.log(this.id);
        http
            .get("/taskByDiscipline/"+this.id)
            .then(response =>{
              this.tasksByDiscipline = response.data;
              this.teacher_discipline_id = this.id;
              console.log(this.teacher_discipline_id, "teacherId")
            })
            .catch(e=>{
              console.log(e);
            })
    }
  },
  mounted() {
    this.getTasksByDiscipline();
  }
}
</script>