<template>
  <transition name="modal-fade">
    <div class="modal-backdrop">
      {{this.id}}{{this.id==3}} asdasdasda
    </div>
  </transition>
</template>
<script>
export default {
  name: 'comment-modal',
  props: ['id'],
  methods: {
    close() {
      this.$emit('close');
    },
  },
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
</style>