<template>
  <div v-if="this.role===2" class="container">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="text-center">
          <h3 class="text-white mb-3" style="background-color: #007bff; padding: 10px;">Задание</h3>
            <form @submit="uploadFile(userTask.id)" class="text-left">
              <div class="form-group">
                <label for="name" class="text-dark">Задача:</label>
                <label class="form-control">{{task.name}}</label>
              </div>
              <div class="form-group">
                <label for="name" class="text-dark">Описание:</label>
                <label class="form-control">{{task.description}}</label>
              </div>

              <div class="form-group">
                <label class="text-dark">Загрузить файл</label>
                <div class="form-control">
                <input class="form-control" type="file" ref="file" accept=".zip, .rar" v-on:change="handleFileUpload">
                  <label v-if="userTask.file" class="text-success">Файл загружен</label>
                </div>
              </div>
              <div class="form-group" v-if="userTask.comment">
                <label class="text-dark">Комментарий</label>
                <label class="form-control">{{userTask.comment}}</label>
              </div>
              <div class="form-group" >
                <label class="text-dark">Оценка</label>
                <label v-bind:class="{ 'completed': userTask.isComplete === 1 }" class="form-control">{{userTask.mark}}/100</label>
              </div>
              <div class="row mt-3">
                <div class="col">
                  <button type="submit" class="btn btn-primary btn-block">Загрузить файл</button>
                </div>
              </div>
            </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import http from "../../http-common"
import {userRole} from "@/mixins/currentUser";
import '@/components/styles/dataStyle.css'

export default {
  name: "tasksForStudents",
  props: ['id'],
  mixins: [userRole],
  data(){
    return{
      task:{
        teacher_discipline_id: null,
        prog_language_id: null,
        name: "",
        description: ""
      },
      userTask:{
        id: null,
        task_id: null,
        user_id: null,
        mark: 0,
        comment: "",
        file: "",
        mime_type: "",
        isComplete: 0
      }
    }
  },
  methods: {
    async getTask(){
      try {
        const response = await http.get(`/task/${this.id}`);
        this.task = response.data;

      }catch (e){
        console.log(e);
      }
    },
  async uploadFile(id){
    event.preventDefault();
    let formData = new FormData();
    // formData.append('file', this.$refs['file_' + id][0].files);
    formData.append('file',this.userTask.file);
    await http
        .post(`/uploadTask/${id}`,formData,{
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .then((msg)=>{
          console.log(msg);
          window.location.reload()
        })
        .catch((e)=>{
          console.log(e);
        })
  },
    handleFileUpload(){
      this.userTask.file = this.$refs.file.files[0];
    },
    async getUserTask(){
    try{
      const login = this.$store.state.auth.user.login;
      let response = await http.get(`/idByUser/${login}`);
      const user_id = response.data[0].id;
      // const user_id = 7;
      const responseTask = await http.get(`/getTask/userId=${user_id}/taskId=${this.id}`)
      this.userTask = responseTask.data[0]
      if(this.userTask.mark===null) {
        this.userTask.mark = 0;
      }
    }catch (e){
      console.log(e)
    }
  },
  },
  mounted() {
    this.currentUserRole();
    this.getTask();
    this.getUserTask();
  }
}
</script>

<style>
.completed {
  background-color: lightgreen !important;
}
</style>