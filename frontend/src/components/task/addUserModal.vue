<template>

  <transition name="modal-fade">
    <div class="modal-backdrop">
      <form @submit="updateUserTask">
        <div class="modal"
             role="dialog"
             aria-labelledby="modalTitle"
             aria-describedby="modalDescription"
        >
          <header
              class="modal-header"
              id="modalTitle"
          >
            <slot name="header">
              <table>
                <tr>
                  <th>Добавить пользователя</th>
                  <th>            <button
                      type="button"
                      class="btn-close"
                      @click="close"
                      aria-label="Close modal"
                  >
                    x
                  </button></th>
                </tr>
              </table>
            </slot>
          </header>
          <section
              class="modal-body"
              id="modalDescription"
          >
            <slot name="body">
              <div style="height: 200px; overflow-y: scroll; border: 1px solid #ccc;">
                <ul style="list-style: none; padding: 0; margin: 0;" v-for="(user,index) in users" :key="index">
                  <li style="border-bottom: 1px solid #ccc;">
                    <template v-if="!usersInTask.includes(user.id)">
                      {{user.login}} <button v-on:click="addUser(user.id)">Добавить</button>
                    </template>
                  </li>
                </ul>
              </div>
            </slot>
          </section>
          <footer class="modal-footer">
            <slot name="footer">
              <input type="submit" value="Сохранить">
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
        file: null,
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
<style>
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
}

.modal-header,
.modal-footer {
  padding: 40px;
  display: flex;
}

.modal-header {
  border-bottom: 1px solid #eeeeee;
  justify-content: center;
}

.modal-footer {
  border-top: 1px solid #eeeeee;
  justify-content: center;
}

.modal-body {
  position: relative;
  padding: 10px 10px;
}

.btn-close {
  border: none;
  font-size: 20px;
  padding: 15px;
  cursor: pointer;
  font-weight: bold;
  color: #4AAE9B;
  background: transparent;
}
</style>