<template>
  <transition name="modal-fade">
    <div class="modal-backdrop">
      <form @submit="updateUserTask">
        <div class="modal" role="dialog" aria-labelledby="modalTitle" aria-describedby="modalDescription">
          <header class="modal-header" id="modalTitle">
            <slot name="header">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <h2 class="text-white" style="text-align: center; width: 100%;">Редактирование комментария</h2>
                <button type="button" class="btn-close text-white" @click="close" aria-label="Close modal">

                </button>
              </div>
            </slot>
          </header>
          <section class="modal-body" id="modalDescription">
            <slot name="body">
              <div style="display: flex; align-items: center; justify-content: center;">
                <textarea class="form-control" style="resize: none; height: 200px; width: 80%;" v-model="this.userTask.comment"></textarea>
              </div>
            </slot>
          </section>
          <footer class="modal-footer">
            <slot name="footer">
              <div style="display: flex; justify-content: center;">
                <button type="submit" class="btn btn-primary">Добавить/Обновить комментарий</button>
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
      userTask:{
        id: null,
        comment: ""
      }
    }
  },
  methods: {
    close() {
      this.$emit('close');
    },
    async getUserTask(){
      try {
        const data = await http.get(`/userTask/${this.id}`);
        this.userTask = data.data;
      }catch (e){
        console.log(e);
      }
    },
    async updateUserTask(e){
      e.preventDefault();
      var data = {
        comment: this.userTask.comment
      }
      console.log(this.id);
      try{
        await http.post(`/updateUserTask/${this.id}`,data);
        this.close();
      }catch (e){
        console.log(e);
      }
    }
  },
  mounted() {
    this.getUserTask();
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