<template>
    <div v-if="user">
        <h4>Данные пользователя</h4>
        <form @submit="updateUser">
            <div>
                <input type="text" name="login" id="login" placeholder="Логин" required v-model="user.login">
            </div>
<!--            <div>-->
<!--                <input type="text" name="password" id="password" placeholder="Логин" required v-model="user.password">-->
<!--            </div>-->
            <div>
                <select class="form-select" required v-model="user.role_id">
                    <option value="" disabled selected>Выберите роль</option>
                    <option v-for="role in roles" v-bind:key="role.id" v-bind:value="role.id">
                        {{role.name}}
                    </option>
                </select>
            </div>
            <div>
                <input type="submit" value="Обновить">
            </div>
            <div>
                <button v-on:click="deleteUser()">Удалить</button>
            </div>
        </form>
    </div>
    <div v-else>
        <br>
        <p>Выберите студента</p>
    </div>
</template>

<script>
    import http from "../../http-common";
    export default {
        name: "user-details",
        props: ['id'],
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
            this.getUser();
            this.getRoles();
        }
    }
</script>