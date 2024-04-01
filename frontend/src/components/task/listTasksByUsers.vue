<template>
  <table style="table-layout: fixed; width: 100%;">
    <thead>
    <tr>
    <th>Таблица студентов</th>
    <th>Редактирование задания</th>
    </tr>
    </thead>
    <tr>
    <th style="width: 80%;">
      <table border="1">
        <thead>
        <tr>
          <th>Пользователь</th>
          <th>Комментарий</th>
          <th>Загрузить файл</th>
          <th>Отметка выполнено</th>
          <th>Удалить</th>
          <th><button v-on:click="showUserModal">Добавить студентов к заданию</button></th>
          <userModal v-show="isUserModalVisible" :id="this.id" @close="closeUserModal"/>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(task,index) in userTasks" :key="index">
          <td>{{task.login}}</td>
          <td>
            <button type="button" v-on:click="showModal(task.id)" :class="{'has-comment': task.comment && task.comment.length>0}">
                {{ task.comment && task.comment.length > 0 ? commentSlice(task.comment) : 'Добавить комментарий' }}
            </button>
          </td>
          <td>{{task.file}}</td>
          <td><input type="checkbox" :true-value="1" :false-value="0" v-model="task.isComplete" v-on:click="switchCheckbox(task.id)"></td>
          <td>
            <button v-on:click="deleteUser(task.id)">Удалить</button>
          </td>
          <modal v-show="isModalVisible && selectedTaskId===task.id" :id="task.id" @close="closeModal"/>
        </tr>
        </tbody>
      </table>
    </th>
    <th style="width: 20%;">
      <div>
      <form @submit="updateTask">
        <div>
          <textarea style="resize: none;width: 60%;height: 10%" type="text" placeholder="Название" required v-model="this.task.name"></textarea>
        </div>
        <div>
          <textarea style="resize: none;width: 60%;height: 10%" type="text" placeholder="Описание" required v-model="this.task.description"></textarea>
        </div>
        <div>
          <input type="submit" value="Обновить">
        </div>
        <div>
          <button v-on:click="deleteTask()">Удалить</button>
        </div>
      </form>
      </div>
    </th>
    </tr>
  </table>



</template>

<script>
import http from "../../http-common";
import modal from "./commentModal.vue";
import userModal from "./addUserModal.vue";
export default {
  name: "tasksByUsers",
  props: ['id'],
  components:{
    modal,
    userModal
  },
    data(){
      return{
        userTasks: [],
        task:{
          teacher_discipline_id: null,
          prog_language_id: null,
          name: "",
          description: ""
        },
        isModalVisible: false,
        selectedTaskId: null,
        isUserModalVisible: false
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
    },
    commentSlice(comment){
      if(comment.length>30){
        return comment.slice(0,30);
      }else{
        return comment;
      }
    },
    showUserModal(){
      this.isUserModalVisible=true;
    },
    closeUserModal(){
      this.isUserModalVisible=false;
      // window.location.reload();
    },
    showModal(taskId){
      this.isModalVisible=true;
      this.selectedTaskId=taskId;
      console.log("modal showed");
    },
    closeModal(){
      this.isModalVisible=false;
      this.selectedTaskId=null;
      // window.location.reload();
    }
  },
  mounted() {
    this.getUsersByTask();
    this.getTask(this.id);
  }
}
</script>

<style>
.has-comment {
  background-color: #C9F389;
}
</style>