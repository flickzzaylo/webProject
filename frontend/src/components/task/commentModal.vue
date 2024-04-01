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
                <th>Редактирование комментарий</th>
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
            <textarea style="resize: none;width: 100%;height: 200px" v-model="this.userTask.comment"/>
          </slot>
        </section>
        <footer class="modal-footer">
          <slot name="footer">
            <input type="submit" value="Добавить/Обновить комментарий">
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