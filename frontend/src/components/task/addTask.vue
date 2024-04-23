<template>
<div v-if="this.role===3 || this.role===1">
  <h4>Добавление задачи</h4>
  <form @submit="addTask">
    <div>
      <input style="height: 25px;width: 500px" type="text" placeholder="Название" required v-model="task.name">
    </div>
    <br>
    <div>
      <textarea style="resize: none;width: 30%;height: 100px" type="text" placeholder="Описание" required v-model="task.description"></textarea>
    </div>
    <br>
    <div>
      <select class="form-select" required v-model="task.teacher_discipline_id">
        <option value="" disabled selected>Выберите дисциплину</option>
        <option class="form-select" v-for="tdisc in teacherDisciplines" v-bind:key="tdisc.id" v-bind:value="tdisc.id">
          {{tdisc.teacher_name}} - {{tdisc.discipline_name}}
        </option>
      </select>
    </div>
    <div>
      <select class="form-select" required v-model="task.prog_language_id">
        <option value="" disabled selected>Выберите язык</option>
        <option class="form-select" v-for="lang in progLangs" v-bind:key="lang.id" v-bind:value="lang.id">
          {{lang.name}}
        </option>
      </select>
    </div>
    <div>
      <input type="submit" value="Добавить">
    </div>
  </form>
</div>
</template>

<script>
import http from "../../http-common";
import {userRole} from "@/mixins/currentUser";
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