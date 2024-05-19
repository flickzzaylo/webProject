<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="text-center">
          <h3 class="text-white mb-3" style="background-color: #007bff; padding: 10px;">Выбор задания</h3>
  <ul v-if="this.role===1 || this.role===3" class="list-group">
    <li class="list-group-item" v-for="(taskByDisc,index) in tasksByDiscipline" :key="index">
      <router-link :to="{
      name:'tasksByUsers',
      params: {id: taskByDisc.id},
      query: {teacherDId: this.teacher_discipline_id}
      }" class="nav-link text-dark">
        <span style="font-family: Arial, sans-serif; font-size: 18px; text-decoration: none;">
          {{taskByDisc.name}}
        </span>
      </router-link>
    </li>
  </ul>
          <ul v-if="this.role===2" class="list-group">
            <li class="list-group-item" v-for="(taskByDisc,index) in taskByDisciplineToUsers" :key="index">
              <router-link :to="{
      name:'taskForStudents',
      params: {id: taskByDisc.id},
      query: {teacherDId: this.teacher_discipline_id}
      }" class="nav-link text-dark">
        <span style="font-family: Arial, sans-serif; font-size: 18px; text-decoration: none;">
          {{taskByDisc.name}}
        </span>
              </router-link>
            </li>
          </ul>

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
      teacher_discipline_id: this.id,
      taskByDisciplineToUsers: []
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
    },
    async getTaskByUsers(){
      try{
        const login = this.$store.state.auth.user.login;
        let response = await http.get(`/idByUser/${login}`);
        const user_id = response.data[0].id;
        const response_2 = await http.get(`/tasks/userId=${user_id}/teacherDisciplineId=${this.id}`)
        this.taskByDisciplineToUsers = response_2.data
      }catch (e){
        console.log(e);
      }
    }
  },
  mounted() {
    this.currentUserRole();
    this.getTasksByDiscipline();
    this.getTaskByUsers();
  }
}
</script>