<template>
  <div>
    Таблица студентов
  </div>
  <form @submit="updateTask">
    <div>
      <textarea style="resize: none;width: 30%;height: 10%" type="text" placeholder="Название" required v-model="this.task.name"></textarea>
    </div>
    <div>
      <textarea style="resize: none;width: 30%;height: 10%" type="text" placeholder="Описание" required v-model="this.task.description"></textarea>
    </div>
    <div>
      <input type="submit" value="Обновить">
    </div>
    <div>
      <button v-on:click="deleteTask()">Удалить</button>
    </div>
  </form>
  <table border="1">
    <thead>
      <tr>
        <th>Пользователь</th>
        <th>Редактировать описание</th>
        <th>Загрузить файл</th>
        <th>Отметка выполнено</th>
        <th>Удалить</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(task,index) in userTasks" :key="index">
        <td>{{task.login}}</td>
        <td>
          Описание
        </td>
        <td>{{task.file}}</td>
        <td><input type="checkbox" :true-value="1" :false-value="0" v-model="task.isComplete" v-on:click="switchCheckbox(task.id)"></td>
        <td>
          <button v-on:click="deleteUser(task.id)">Удалить</button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import http from "../../http-common";
export default {
  name: "tasksByUsers",
  props: ['id'],
    data(){
      return{
        userTasks: [],
        task:{
          teacher_discipline_id: null,
          prog_language_id: null,
          name: "",
          description: ""
        }
      };
    },
  methods: {
    getUsersByTask(){
      console.log(this.id);
      http
          .get(`/getUserTasksByTaskId/${this.id}`)
          .then(response=>{
            this.userTasks = response.data;
          })
          .catch(e=>{
            console.log(e)
          })
    },
    async getTask(id){
      try {
        const response = await http.get(`/task/${id}`);
        this.task = response.data;
      }catch (e){
        console.log(e);
      }
    },
    deleteUser(id) {
      console.log(id);
      http
          .post(`/deleteTaskByUserId/${id}`)
          .then(()=>{
            this.getUsersByTask();
          })
          .catch(e=>{
            console.log(e);
          })
    },
    async switchCheckbox(id){
      await http.post(`/switchComplete/${id}`);
      this.getUsersByTask();
    },
    async updateTask(e){
      e.preventDefault();
      var data = {
          teacher_discipline_id: this.task.teacher_discipline_id,
          prog_language_id: this.task.prog_language_id,
          name: this.task.name,
          description: this.task.description
      }
      try {
        await http.post(`/updateTask/${this.task.id}`,data);
        this.getUsersByTask();
      }catch (e){
        console.log(e);
      }
    },
    async deleteTask(){
      console.log(this.teacherDId);
      try {
        await http.post(`/deleteTask/${this.id}`)
        this.$router.push(`/listTasksByD/${this.$route.query.teacherDId}`)
      }catch (e){
        console.log(e);
      }
    }
  },
  mounted() {
    this.getUsersByTask();
    this.getTask(this.id);
  }
}
</script>