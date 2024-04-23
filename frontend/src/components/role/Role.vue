<template>
    <div v-if="this.roleUser && this.role===3">
        Роль
        <div v-if="!submitted">
            <form @submit="updateRole">
                <input type="text" name="name" id="name" placeholder="Наименование" required v-model="roleUser.name">
                <input type="submit" value="Обновить">
            </form>
            <button v-on:click="deleteRole()">Удалить</button>
        </div>
        <div v-else>
            <h4>Запись обновлена</h4>
            <router-link to="/listRoles">Вернуться к списку ролей</router-link>
        </div>
    </div>
</template>

<script>
import http from "../../http-common"
import {userRole} from "@/mixins/currentUser";
export default{
    name: "role-details",
    props: ['id'],
  mixins: [userRole],
    data(){
        return{
        roleUser: null,
            submitted: false
        };
    },
    methods: {
            getRole() {
                http
                    .get("/role/" + this.id)
                    .then(response => {
                        this.roleUser = response.data;
                    })
                    .catch(e => {
                        console.log(e);
                    });
            },
            updateRole(e) {
                e.preventDefault();
                var data = {
                    name: this.roleUser.name
                };

                http
                    .post("/updateRole/" + this.roleUser.id, data)
                    .then(() => {
                    })
                    .catch(e => {
                        console.log(e);
                    });
                this.submitted = true;
            },
            deleteRole() {
                http
                    .post("/deleteRole/" + this.roleUser.id)
                    .then(() => {
                        this.$router.push('/listRoles');
                    })
                    .catch(e => {
                        console.log(e);
                    });
            }
        },
        mounted() {
            this.currentUserRole();
            this.getRole();
        }
}
</script>