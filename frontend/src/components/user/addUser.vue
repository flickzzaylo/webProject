<template>
  <div>
    <h4>Добавление пользователя</h4>
    <form @submit="addUser">
      <div>
        <input type="text" placeholder="Логин" required v-model="user.login">
      </div>
      <div>
        <input type="text" placeholder="Пароль" required v-model="user.password">
      </div>
      <div>
        <select class="form-select" required v-model="user.role_id">
          <option value="" disabled selected>Выберите роль</option>
          <option class="form-select" v-for="role in roles" v-bind:key="role.id" v-bind:value="role.id">
            {{role.name}}
          </option>
        </select>
      </div>
      <div>
        <input type="submit" value="Добавить">
      </div>
    </form>
  </div>
</template>

<script>
import http from "../../http-common"
export default {
  name: "addUser",
  data(){
    return{
      user:{
        login: "",
        password: "",
        role_id: null
      },
      roles: []
    }
  },
  methods: {
    async getRoles(){
      const response = await http.get('/listRoles');
      this.roles = response.data;
    },
    async addUser(e) {
      try {
        e.preventDefault();
        var data = {
          login: this.user.login,
          password: this.user.password,
          role_id: this.user.role_id
        };
        await http.post("/createUser", data);
        this.$router.push("/listUsers")
      }catch (e){
        console.log(e);
      }
    },
  },
  mounted() {
    this.getRoles();
  }
}
</script>