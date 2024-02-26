<template>
    <div v-if="this.role">
        Роль
        <div v-if="!submitted">
            <form @submit="updateRole">
                <input type="text" name="name" id="name" placeholder="Наименование" required v-model="role.name">
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
export default{
    name: "role-details",
    props: ['id'],
    data(){
        return{
            role: null,
            submitted: false
        };
    },
    methods: {
            getRole() {
                http
                    .get("/role/" + this.id)
                    .then(response => {
                        this.role = response.data;
                    })
                    .catch(e => {
                        console.log(e);
                    });
            },
            updateRole(e) {
                e.preventDefault();
                var data = {
                    name: this.role.name
                };

                http
                    .post("/updateRole/" + this.role.id, data)
                    .then(() => {
                    })
                    .catch(e => {
                        console.log(e);
                    });
                this.submitted = true;
            },
            deleteRole() {
                http
                    .post("/deleteRole/" + this.role.id)
                    .then(() => {
                        this.$router.push('/listRoles');
                    })
                    .catch(e => {
                        console.log(e);
                    });
            }
        },
        mounted() {
            this.getRole();
        }
}
</script>