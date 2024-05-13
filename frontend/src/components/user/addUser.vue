<template>
  <div v-if="this.role===3" class="container">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="text-center">
          <h3 class="text-white mb-3" style="background-color: #007bff; padding: 10px;">Добавление пользователя</h3>
    <form @submit="addUser" class="text-left">
      <div class="form-group">
        <label for="name" class="text-dark">Логин:</label>
        <input type="text" placeholder="Логин" required v-model="user.login" class="form-control form-control-dark">
        <label for="name" class="text-dark">Пароль:</label>
        <input type="text" placeholder="Пароль" required v-model="user.password" class="form-control form-control-dark">
      </div>
        <div class="form-group">
        <label for="name" class="text-dark">Роль:</label>
        <select required class="form-control form-control-dark" v-model="user.role_id">
          <option value="" disabled selected>Выберите роль</option>
          <option v-for="role in roles" v-bind:key="role.id" v-bind:value="role.id">
            {{role.name}}
          </option>
        </select>
        </div>
      <button type="submit" value="Добавить" class="btn btn-primary btn-block mt-3">Добавить</button>
    </form>
  </div>
      </div>
    </div>
  </div>
</template>

<script>
import http from "../../http-common"
import {userRole} from "@/mixins/currentUser";
import '@/components/styles/addStyle.css'
export default {
  name: "addUser",
  mixins: [userRole],
  data(){
    return{
      user:{
        login: "",
        password: "",
        role_id: null
      },
      roles: [],
      successful: false,
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
        // var data = {
        //   login: this.user.login,
        //   password: this.user.password,
        //   role_id: this.user.role_id
        // };
        // await http.post("/createUser", data);
        await this.$store.dispatch("auth/register", this.user);
        this.successful=true;
        this.$router.push("/listUsers");
      }catch (e){
        console.log(e);
      }
    }
  },
  mounted() {
    this.currentUserRole();
    this.getRoles();
  }
}
</script>