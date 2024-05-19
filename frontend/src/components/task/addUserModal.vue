<template>
  <transition name="modal-fade">
    <div class="modal-backdrop">
      <form @submit="updateUserTask">
        <div class="modal" role="dialog" aria-labelledby="modalTitle" aria-describedby="modalDescription">
          <header class="modal-header" id="modalTitle">
            <slot name="header">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <h2 class="text-white" style="text-align: center; width: 100%;">Добавить пользователя</h2>
                <button type="button" class="btn-close text-white" @click="close" aria-label="Close modal">

                </button>
              </div>
            </slot>
          </header>
          <section class="modal-body" id="modalDescription">
            <slot name="body">
              <div class="row">
              <div style="align-items: center; justify-content: center;">
                <ul class="list-group text-center" v-for="(user,index) in users" :key="index">
                  <li v-if="!usersInTask.includes(user.id)" class="list-group-item d-flex justify-content-between align-items-center">
                    <span>{{user.login}}</span>
                    <button class="btn btn-sm btn-outline-success" v-on:click="addUser(user.id)">Добавить</button>
                  </li>
                </ul>
              </div>
              </div>
            </slot>
          </section>
          <footer class="modal-footer">
            <slot name="footer">
              <div style="display: flex; justify-content: center;">
                <button type="submit" class="btn btn-primary">Добавить пользователей</button>
              </div>
            </slot>
          </footer>
        </div>
      </form>
    </div>
  </transition>
</template>
<script>
import http from "../../http-common";
export default {
  name: 'comment-modal',
  props: ['id'],
  data(){
    return{
      userTasks: [],
      users: [],
      usersInTask: []
    }
  },
  methods: {
    close() {
      // console.log(this.userTasks)
      this.$emit('close');
    },
    getUsersByTask(){
      this.userTasks = [];
      console.log(this.id + "modal");
      http
          .get(`/getUserTasksByTaskId/${this.id}`)
          .then(response=>{
            this.userTasks = response.data;
            for(let i=0;i<this.userTasks.length;i++){
              this.usersInTask.push(this.userTasks[i].user_id);
            }
          })
          .catch(e=>{
            console.log(e)
          })
    },
    async switchCheckbox(id){
      await http.post(`/switchComplete/${id}`);
      this.getUsersByTask();
    },
    async getUsers(){
      try{
        const response = await http.get('/userByRoleID/2'); //ЕСЛИ БД ПОМЕНЯТЬ, ТО ВСЕ ПОЛЕТИТ
        this.users = response.data;
      }catch (e){
        console.log(e);
      }
    },
    deleteUser(id) {
      event.preventDefault();
      http
          .post(`/deleteTaskByUserId/${id}`)
          .then(()=>{
            console.log(id);
            this.getUsersByTask();
          })
          .catch(e=>{
            console.log(e);
          })
    },
    async addUser(id){
      event.preventDefault();
      var data = {
        task_id:this.id,
        user_id:id,
        mark:null,
        comment: "",
        file: "",
        mime_type: "",
        isComplete: 0
      };
      try {
        await http.post(`/addUserToTask/${id}`, data);
        await this.getUsersByTask();
      }catch (e){
        console.log(e);
      }
    }
  },
  mounted() {
    this.getUsersByTask();
    this.getUsers();
  }
};
</script>
<style scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background: #FFFFFF;
  box-shadow: 2px 2px 20px 1px;
  overflow-x: auto;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  width: 30%; /* Added this line */
}

.modal-header {
  background-color: #007bff;
  border-bottom: none;
  padding: 20px;
}

.modal-footer {
  border-top: none;
  padding: 20px;
}

.btn-close {
  color: #ffffff;
  opacity: 1;
}

.modal-enter,
.modal-leave-active {
  opacity: 0;
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.5s;
}
</style>