<template>
  <div v-if="this.role===3 || this.role===1" class="container">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="text-center">
          <h3 class="text-white mb-3" style="background-color: #007bff; padding: 10px;">Выбор задания</h3>
  <ul class="list-group">
    <li class="list-group-item" v-for="(taskByDisc,index) in tasksByDiscipline" :key="index">
      <router-link :to="{
      name:'tasksByUsers',
      params: {id: taskByDisc.id},
      query: {teacherDId: this.teacher_discipline_id}
      }" class="nav-link text-dark">
        <span style="font-family: Arial, sans-serif; font-size: 18px; text-decoration: none;">
          {{taskByDisc.name}} {{taskByDisc.description}}
        </span>
      </router-link>
    </li>
  </ul>

<!--  <div v-if="this.role===2">-->
<!--    <ul>-->
<!--    <li v-for="(taskByDisc,index) in tasksByDiscipline" :key="index">-->
<!--&lt;!&ndash;      <router-link :to="{&ndash;&gt;-->
<!--&lt;!&ndash;      name:'tasksByUsers',&ndash;&gt;-->
<!--&lt;!&ndash;      params: {id: taskByDisc.id},&ndash;&gt;-->
<!--&lt;!&ndash;      query: {teacherDId: this.teacher_discipline_id}&ndash;&gt;-->
<!--&lt;!&ndash;      }">&ndash;&gt;-->
<!--        {{taskByDisc.name}} {{taskByDisc.description}}-->
<!--&lt;!&ndash;      </router-link>&ndash;&gt;-->
<!--    </li>-->
<!--    </ul>-->
<!--  </div>-->

  <div v-if="this.role===3 || this.role===1"><router-link class="btn btn-primary btn-block mt-3" to="/addTask">Добавить задание</router-link></div>
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
  name: "listTasksByD",
  props: ['id'],
  mixins: [userRole],
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
    this.currentUserRole();
    this.getTasksByDiscipline();
  }
}
</script>