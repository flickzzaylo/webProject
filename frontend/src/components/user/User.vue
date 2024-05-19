<template>
    <div v-if="user && this.role===3" class="container">
      <div class="row justify-content-center">
        <div class="col-md-8">
          <div class="text-center">
            <h3 class="text-white mb-3" style="background-color: #007bff; padding: 10px;">Данные пользователя</h3>
        <form @submit="updateUser" class="text-left">
          <div class="form-group">
                <label for="name" class="text-dark">Логин:</label>
                <input type="text" name="login" id="login" placeholder="Логин" required v-model="user.login" class="form-control">
            <div>
              <label for="name" class="text-dark">Роль:</label>
                <select class="form-control form-control-dark" required v-model="user.role_id">
                    <option value="" disabled selected>Выберите роль</option>
                    <option v-for="role in roles" v-bind:key="role.id" v-bind:value="role.id">
                        {{role.name}}
                    </option>
                </select>
            </div>
          </div>
            <div class="row mt-3">
            <div class="col">
              <button type="submit" value="Обновить" class="btn btn-primary btn-block">Обновить</button>
            </div>
            <div class="col">
                <button v-on:click="deleteUser()" class="btn btn-danger btn-block">Удалить</button>
            </div>
            </div>
        </form>
    </div>
        </div>
      </div>
    </div>
</template>

<script>
    import http from "../../http-common";
    import {userRole} from "@/mixins/currentUser";
    import '@/components/styles/dataStyle.css'
    export default {
        name: "user-details",
        props: ['id'],
        mixins: [userRole],
        data() {
            return {
                user: null,
                roles: []
            };
        },
        methods: {
            getUser() {
                http
                    .get("/user/"+ this.id)
                    .then(response => {
                        this.user = response.data;
                    })
                    .catch(e => {
                        console.log(e);
                    });
            },
            getRoles() {
                http
                    .get("/listRoles")
                    .then(response => {
                        this.roles = response.data;
                    })
                    .catch(e => {
                        console.log(e);
                    });
            },
            updateUser(e) {
                e.preventDefault();
                var data = {
                    login: this.user.login,
                    password: this.user.password,
                    role_id: this.user.role_id
                };
                http
                    .post("/updateUser/" + this.user.id, data)
                    .then(() => {
                        this.$router.push('/listUsers');
                    })
                    .catch(e => {
                        console.log(e);
                    });
            },
            deleteUser() {
                http
                    .post("/deleteUser/" + this.user.id)
                    .then(() => {
                        this.$router.push('/listUsers');
                    })
                    .catch(e => {
                        console.log(e);
                    });
            }
        },
        mounted() {
          this.currentUserRole();
            this.getUser();
            this.getRoles();
        }
    }
</script>