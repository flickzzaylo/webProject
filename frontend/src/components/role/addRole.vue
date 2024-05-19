<template>
    <div v-if="this.role===3" class="container">
      <div class="row justify-content-center">
        <div class="col-md-8">
          <div class="text-center">
            <h3 class="text-white mb-3" style="background-color: #007bff; padding: 10px;">Добавление роли</h3>
        <div v-if="!submitted">
            <form @submit="addRole" class="text-left">
              <div class="form-group">
                <label for="name" class="text-dark">Наименование роли:</label>
                <input type="text" name="name" id="name" placeholder="Наименование роли" required v-model="roleUser.name" class="form-control form-control-dark">
              </div>
              <button class="btn btn-primary btn-block mt-3" type="submit" value="Добавить">Добавить</button>
            </form>
        </div>
        <div v-else>
            <h4 class="text-center">Запись добавлена</h4>
            <div class="text-center">
                <button class="btn btn-primary btn-block mt-3" v-on:click="newRole">Добавить новую роль</button>
            </div>
            <div class="text-center mt-3">
                <router-link class="btn btn-secondary btn-block" to="/listRoles">Вернуться к списку ролей</router-link>
            </div>
        </div>
    </div>
        </div>
      </div>
    </div>
</template>

<script>
import http from "../../http-common"
import {userRole} from "@/mixins/currentUser";
import '@/components/styles/addStyle.css'
export default{
    name:"AddRole",
  mixins:[userRole],
    data(){
        return{
            roleUser:{
                id:null,
                name: ""
            },
            submitted: false
        };
    },
    methods: {
        addRole(e){
            e.preventDefault();
            var data = {
                name: this.roleUser.name
            };
            http
                    .post("/addRole", data)
                    .then(response => {
                        this.roleUser.id = response.data.id;
                    })
                    .catch(e => {
                        console.log(e);
                    });

                this.submitted = true;
        },
        newRole() {
                this.submitted = false;
                this.roleUser = {
                    id: null,
                    name: ""
                };
            }
    },
  mounted() {
      this.currentUserRole();
  }
}
</script>