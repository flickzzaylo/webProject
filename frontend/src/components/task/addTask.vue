<template>
<div v-if="this.role===3 || this.role===1" class="container">
  <div class="row justify-content-center">
    <div class="col-md-8">
      <div class="text-center">
  <h3 class="text-white mb-3" style="background-color: #007bff; padding: 10px;">Добавление задачи</h3>
  <form @submit="addTask" class="text-left">
    <div class="form-group">
      <label for="name" class="text-dark">Название:</label>
      <input class="form-control form-control-dark"  type="text" placeholder="Название" required v-model="task.name">
    </div>
    <div class="form-group">
      <label for="name" class="text-dark">Описание:</label>
      <textarea class="form-control form-control-dark" style="resize: none" type="text" placeholder="Описание" required v-model="task.description"></textarea>
    </div>
    <div class="form-group">
      <label for="name" class="text-dark">Дисциплина:</label>
      <select class="form-control form-control-dark" required v-model="task.teacher_discipline_id">
        <option value="" disabled selected>Выберите дисциплину</option>
        <option class="form-select" v-for="tdisc in teacherDisciplines" v-bind:key="tdisc.id" v-bind:value="tdisc.id">
          {{tdisc.teacher_name}} - {{tdisc.discipline_name}}
        </option>
      </select>
    </div>
    <div class="form-group">
      <label for="name" class="text-dark">Язык программирования:</label>
      <select class="form-control form-control-dark" required v-model="task.prog_language_id">
        <option value="" disabled selected>Выберите язык</option>
        <option class="form-select" v-for="lang in progLangs" v-bind:key="lang.id" v-bind:value="lang.id">
          {{lang.name}}
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
import "@/components/styles/addStyle.css"
  export default{
    name: "addTask",
    mixins: [userRole],
    data(){
      return{
        task:{
          teacher_discipline_id: null,
          prog_language_id: null,
          name: "",
          description: ""
        },
        teacherDisciplines: [],
        progLangs: []
      };
    },
    methods: {
      async getTeacherDisciplines(){
        try{
          const response = await http.get('/listTeacherDisciplines');
          this.teacherDisciplines = response.data;
        }catch (e){
          console.log('addTask.vue, getTD ' + e);
        }
      },
      async getProgLangs(){
        try{
          const response = await http.get('/listProgLang');
          this.progLangs = response.data;
        }catch (e){
          console.log('addTask.vue getPL ' + e);
        }
      },
      async addTask(e){
        try {
          e.preventDefault();
          var data = {
            teacher_discipline_id: this.task.teacher_discipline_id,
            prog_language_id: this.task.prog_language_id,
            name: this.task.teacher_discipline_id,
            description: this.task.description
          };
          await http.post("/addTask", data);
          this.$router.push('/listTasksByD/ ' + this.task.teacher_discipline_id);
        }catch (e){
          console.log(e);
        }
      }
    },
    mounted() {
      this.currentUserRole();
      this.getTeacherDisciplines();
      this.getProgLangs();
    }
  }
</script>