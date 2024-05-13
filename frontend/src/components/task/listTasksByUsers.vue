<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12">
        <h3 class="text-white mb-3" style="background-color: #007bff; padding: 10px;">Информация о задании</h3>
        <form @submit="updateTask" class="text-left">
          <div>
            <textarea class="form-control form-control-dark" style="resize: none" type="text" placeholder="Название" required v-model="this.task.name"></textarea>
          </div>
          <div>
            <textarea class="form-control form-control-dark" style="resize: none" type="text" placeholder="Описание" required v-model="this.task.description"></textarea>
          </div>
          <div class="row mb-3 text-center">
            <div class="col">
              <button type="submit" class="btn btn-primary btn-block">Обновить</button>
            </div>
            <div class="col">
              <button v-on:click="deleteTask()" class="btn btn-danger btn-block">Удалить</button>
            </div></div>
        </form>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12 text-center">
        <table class="table table-bordered table-striped table-hover mt-3">
          <thead class="thead-dark">
          <tr>
            <th scope="col">Пользователь</th>
            <th scope="col">Комментарий</th>
            <th scope="col">Архив</th>
            <th scope="col">База данных</th>
            <th scope="col">Backend</th>
            <th scope="col">Отметка выполнено</th>
            <th scope="col">Удалить</th>
            <th scope="col"><button class="btn btn-primary" v-on:click="showUserModal">Добавить студентов к заданию</button></th>
            <userModal v-show="isUserModalVisible" :id="this.id" @close="closeUserModal"/>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(task,index) in userTasks" :key="index">
            <td>{{task.login}}</td>
            <td>
              <button type="button" v-on:click="showModal(task.id)" :class="{
                'has-comment': task.comment && task.comment.length>0,
                'btn': true,
                'btn-sm': true,
                'btn-outline-primary': true}">
                {{ task.comment && task.comment.length > 0 ? commentSlice(task.comment) : 'Добавить комментарий' }}
              </button>
            </td>
            <td>
<!--              <input type="file" :ref="'file_' + index" accept=".zip, .rar" v-on:change="uploadFile(task.id)">-->
              <div v-if="task.file">
                <a :href="this.globalVariables.serverUrl + task.file" download>
                  <button class="btn btn-sm btn-outline-primary">Скачать</button>
                </a>
              </div>
            </td>
            <td>
              <span v-if="checkingTaskId===task.id" v-show="sqlLoading" class="spinner-border spinner-border-sm"/>
              <button class="btn btn-sm btn-outline-primary" v-if="task.file" v-on:click="checkSql(task.file, task.id)">Проверить</button>
              <div v-if="sqlCheckMessage!=='' && checkingTaskId===task.id">{{sqlCheckMessage}}</div>
            </td>
            <td>

            </td>
            <td class="form-switch">
              <input class="form-check-input" type="checkbox" :true-value="1" :false-value="0" v-model="task.isComplete" v-on:click="switchCheckbox(task.id)">
            </td>
            <td>
              <button class="btn btn-sm btn-outline-danger" v-on:click="deleteUser(task.id)">Удалить</button>
            </td>
            <modal v-show="isModalVisible && selectedTaskId===task.id" :id="task.id" @close="closeModal"/>
          </tr>
          </tbody>
        </table>
      </div>
      <div class="col-md-12 text-center">
        <h3 class="text-white mb-3" style="background-color: #539dec; padding: 10px;">Тесткейсы</h3>
        <ul class="list-group">
          <li class="list-group-item" v-for="(testcase,index) in testcases" :key="index">
            <span style="font-family: Arial, sans-serif; font-size: 18px; text-decoration: none;">
            {{testcase.input}}
            </span>
            <button class="btn btn-sm btn-outline-danger row ms-2" v-on:click="deleteTestcase(testcase.id)">Удалить</button>
          </li>
        </ul>
        <div class="row justify-content-center">
          <form @submit="addTestcase" class="text-left">
            <input class="form-control form-control-dark" type="text" placeholder="Запрос к базе данных" required v-model="inputToTestcase">
            <button class="btn btn-primary btn-block mt-3" type="submit">Добавить</button>
          </form>
        </div>
      </div>
    </div>
  </div>





<!--  <table style="table-layout: fixed; width: 100%;">-->
<!--    <thead>-->
<!--    <tr>-->
<!--    <th>Таблица студентов</th>-->
<!--    <th>Редактирование задания</th>-->
<!--    </tr>-->
<!--    </thead>-->
<!--    <tr>-->
<!--    <th style="width: 80%;">-->
<!--      <table border="1">-->
<!--        <thead>-->
<!--        <tr>-->
<!--          <th>Пользователь</th>-->
<!--          <th>Комментарий</th>-->
<!--          <th>Загрузить файл</th>-->
<!--          <th>Проверить базу данных</th>-->
<!--          <th>Отметка выполнено</th>-->
<!--          <th>Удалить</th>-->
<!--          <th><button v-on:click="showUserModal">Добавить студентов к заданию</button></th>-->
<!--          <userModal v-show="isUserModalVisible" :id="this.id" @close="closeUserModal"/>-->
<!--        </tr>-->
<!--        </thead>-->
<!--        <tbody>-->
<!--        <tr v-for="(task,index) in userTasks" :key="index">-->
<!--          <td>{{task.login}}</td>-->
<!--          <td>-->
<!--            <button type="button" v-on:click="showModal(task.id)" :class="{'has-comment': task.comment && task.comment.length>0}">-->
<!--                {{ task.comment && task.comment.length > 0 ? commentSlice(task.comment) : 'Добавить комментарий' }}-->
<!--            </button>-->
<!--          </td>-->
<!--          <td>-->
<!--            <input type="file" :ref="'file_' + index" accept=".zip, .rar" v-on:change="uploadFile(task.id)">-->
<!--            <div v-if="task.file">-->
<!--              <a :href="this.globalVariables.serverUrl + task.file" download>-->
<!--              (архив)-->
<!--              </a>-->
<!--            </div>-->
<!--          </td>-->
<!--          <td>-->
<!--            <button v-if="task.file" v-on:click="checkSql(task.file, task.id)">Проверить</button>-->
<!--            <div v-if="sqlCheckMessage!=='' && checkingTaskId===task.id">{{sqlCheckMessage}}</div>-->
<!--          </td>-->
<!--          <td><input type="checkbox" :true-value="1" :false-value="0" v-model="task.isComplete" v-on:click="switchCheckbox(task.id)"></td>-->
<!--          <td>-->
<!--            <button v-on:click="deleteUser(task.id)">Удалить</button>-->
<!--          </td>-->
<!--          <modal v-show="isModalVisible && selectedTaskId===task.id" :id="task.id" @close="closeModal"/>-->
<!--        </tr>-->
<!--        </tbody>-->
<!--      </table>-->
<!--    </th>-->
<!--    <th style="width: 20%;">-->
<!--      <div>-->
<!--      <form @submit="updateTask">-->
<!--        <div>-->
<!--          <textarea style="resize: none;width: 60%;height: 10%" type="text" placeholder="Название" required v-model="this.task.name"></textarea>-->
<!--        </div>-->
<!--        <div>-->
<!--          <textarea style="resize: none;width: 60%;height: 10%" type="text" placeholder="Описание" required v-model="this.task.description"></textarea>-->
<!--        </div>-->
<!--        <div>-->
<!--          <input type="submit" value="Обновить">-->
<!--        </div>-->
<!--        <div >-->
<!--          <button v-on:click="deleteTask()">Удалить</button>-->
<!--        </div>-->
<!--      </form>-->
<!--      </div>-->
<!--      <div>-->
<!--        <h4>Тесткейсы</h4>-->
<!--        <ul>-->
<!--          <li v-for="(testcase,index) in testcases" :key="index">-->
<!--              {{testcase.input}}-->
<!--            <button v-on:click="deleteTestcase(testcase.id)">🗑️</button>-->
<!--          </li>-->
<!--        </ul>-->
<!--        <div>-->
<!--          <form @submit="addTestcase">-->
<!--              <input type="text" placeholder="Запрос к базе данных" required v-model="inputToTestcase">-->
<!--              <button type="submit">Добавить</button>-->
<!--          </form>-->
<!--        </div>-->
<!--      </div>-->
<!--    </th>-->
<!--    </tr>-->
<!--  </table>-->



</template>

<script>
import http from "../../http-common";
import modal from "./commentModal.vue";
import userModal from "./addUserModal.vue";
import {userRole} from "@/mixins/currentUser";
export default {
  name: "tasksByUsers",
  props: ['id'],
  mixins: [userRole],
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
        isUserModalVisible: false,
        testcases: [],
        inputToTestcase: "",
        sqlCheckMessage: "",
        checkingTaskId: null,
        sqlLoading: false
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
    async checkSql(file, task_id){
      this.sqlLoading = true;
      this.checkingTaskId=task_id;
      const data = {
        fileName: file,
        task_id: this.id
      };
      try{
        const res = await http.post('/checkSql',data);
        if(res.data=="Succesful"){
          this.sqlLoading = false;
          this.sqlCheckMessage = "Проверка пройдена"
        }
        else{
          this.sqlLoading = false;
          this.sqlCheckMessage = `Тест не пройден, запрос: ${res.data.sql}`;
        }
        console.log(this.sqlCheckMessage);
      }
      catch (e){
        console.log(e);
      }
    },
    getTestCasesToTask(){
      http.get(`/testcasesByTask/${this.id}`)
          .then(response=>{
            this.testcases = response.data;
          })
          .catch(e=>{
            console.log(e);
          })
    },
    async addTestcase(e){
      e.preventDefault();
      var data = {
        task_id: this.id,
        input: this.inputToTestcase
      }
      http.post('/addTestcase',data)
          .then(window.location.reload())
          .catch(e=>{
            console.log(e);
          })
    },
    async uploadFile(id){
      event.preventDefault();
      const index = this.userTasks.findIndex(task=>task.id ===id)
      let formData = new FormData();
      formData.append('file', this.$refs['file_' + index][0].files[0]);
      await http
          .post(`/uploadTask/${id}`,formData,{
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
          .then((msg)=>{
            console.log(msg);
          })
          .catch((e)=>{
            console.log(e);
          })
    },
    deleteTestcase(id){
      console.log(id);
      http.post(`/deleteTestcase/${id}`)
          .then()
          .catch(e=>{
            console.log(e);
          })
      window.location.reload();
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
      window.location.reload();
    },
    showModal(taskId){
      this.isModalVisible=true;
      this.selectedTaskId=taskId;
      console.log("modal showed");
    },
    closeModal(){
      this.isModalVisible=false;
      this.selectedTaskId=null;
      window.location.reload();
    }
  },
  mounted() {
    this.currentUserRole();
    this.getUsersByTask();
    this.getTask(this.id);
    this.getTestCasesToTask(this.id);
  }
}
</script>

<style>
.has-comment {
  background-color: lightblue !important;
}
.table tbody tr:hover {
  background-color: #f5f5f5;
}

.has-comment {
  background-color: #007bff;
  color: #fff;
}

.has-comment:hover {
  background-color: #0056b3;
  color: #fff;
}
</style>