<template>
    <div v-if="this.role===3">
        Добавление роли
        <div v-if="!submitted">
            <form @submit="addRole">
                <input type="text" name="name" id="name" placeholder="Наименование роли" required v-model="roleUser.name">
                <input type="submit" value="Добавить">
            </form>
        </div>
        <div v-else>
            <h4>Запись добавлена</h4>
            <div>
                <button v-on:click="newRole">Добавить новую роль</button>
            </div>
            <div>
                <router-link class="item" to="/listRoles">Вернуться к списку ролей</router-link>
            </div>
        </div>
    </div>
</template>

<script>
import http from "../../http-common"
import {userRole} from "@/mixins/currentUser";
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