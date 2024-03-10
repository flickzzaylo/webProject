<template>
  <div>
    Выберите студента
  </div>
  <ul>
    <li v-for="(user,index) in users" :key="index">
      {{user.login}}
    </li>
  </ul>
</template>

<script>
import http from "../../http-common";
export default {
  name: "tasksByUsers",
  props: ['teacherDId','id'],
    data(){
      return{
        users: [],
      };
    },
  methods: {
    getUsersByTask(){
      console.log(this.id);
      console.log(this.teacherDId);
      http
          .get(`/task/teacherDId=${this.teacherDId}/taskId=${this.id}`)
          .then(response=>{
            this.users = response.data;
          })
          .catch(e=>{
            console.log(e)
          })
    }
  },
  mounted() {
    this.getUsersByTask();
  }
}
</script>