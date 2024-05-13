<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="text-center">
          <h3 class="text-white mb-3" style="background-color: #007bff; padding: 10px;">Вход в систему</h3>
    <form name="form" @submit="handleLogin">
      <div class="form-group">
        <label for="name" class="text-dark">Логин:</label>
        <input type="text" class="form-control" name="username" placeholder="Логин" v-model="user.login" required/>
      </div>
      <div class="form-group">
        <label for="name" class="text-dark">Пароль:</label>
        <input type="password" class="form-control" name="password" placeholder="Пароль" v-model="user.password" required/>
      </div>
      <div class="form-group">
        <button class="btn btn-primary btn-block mt-3" :disabled="loading">
          <span v-show="loading" class="spinner-border spinner-border-sm"></span>
          <span>Войти</span>
        </button>
      </div>
      <div class="form-group">
        <div v-if="message" class="alert alert-danger" role="alert">{{message}}</div>
      </div>
    </form>
  </div>
      </div>
    </div>
  </div>
</template>
<script>
import '@/components/styles/addStyle.css'
export default {

  name: 'LoginUser',
  data() {
    return {
      user: {
        login: "",
        password: ""
      },
      loading: false,
      message: ''
    };
  },
  computed: { // вычисляемые свойства
    loggedIn() {
      return this.$store.state.auth.status.loggedIn; // $store - локальное хранилище
    }
  },
  created() {
    if (this.loggedIn) {
      window.location.href = '/';
    }
  },
  methods: {
    handleLogin(e) {
      e.preventDefault();
      this.loading = true;
      this.$store.dispatch("auth/login", this.user) // обращаемся к методу login, который определён в auth.service.js
          .then(() => {
            window.location.href = '/'; // авторизация прошла успешно, переходим к главной странице. Используем такую конструкцию, а не this.$router.push, так как требуется перезагрузить страницу для обновления локального хранилища
          })
          .catch(e => {
                this.loading = false;
                this.message = e.response.data.message;
              }
          );
    }
  }
};
</script>