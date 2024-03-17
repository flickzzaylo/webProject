<template>
  <div>
    Выберите задание
  </div>
  <ul>
    <li v-for="(taskByDisc,index) in tasksByDiscipline" :key="index">
      <router-link :to="{
      name:'tasksByUsers',
      params: {id: taskByDisc.id},
      query: {teacherDId: this.teacher_discipline_id}
      }">
      {{taskByDisc.name}} {{taskByDisc.description}}
      </router-link>
    </li>
  </ul>
  <div><router-link class="item" to="/addTask">Добавить задание</router-link></div>
</template>

<script>
import http from "../../http-common";
export default {
  name: "listTasksByD",
  props: ['id'],
  data(){
    return{
      tasksByDiscipline: [],
      teacher_discipline_id: this.id
    }
  },
  methods: {
    getTasksByDiscipline(){
      console.log(this.id);
      console.log(this.teacher_discipline_id + "teacherID");
        http
            .get("/taskByDiscipline/"+this.id)
            .then(response =>{
              this.tasksByDiscipline = response.data;
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