<template>
    <div v-if="this.role===3">
        <h4>Добавление преподавателей</h4>
        <form @submit="addTeacher">
            <div>
                <input type="text" name="name" id="name" placeholder="ФИО" required v-model="teacher.name">
            </div>
            <div>
                <select class="form-select" required v-model="teacher.user_id">
                    <option value="" disabled selected>Выберите пользователя</option>
                    <option class="form-select" v-for="user in users" v-bind:key="user.id" v-bind:value="user.id">
                        {{user.login}}
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
    import http from "../../http-common";
    import {userRole} from "@/mixins/currentUser";
    export default {
        name: "AddTeacher",
      mixins: [userRole],
        data() {
            return {
                teacher: {
                    name: "",
                    user_id: null
                },
                users: []
            };
        },
        methods: {
            addTeacher(e) {
                e.preventDefault();
                var data = {
                    name: this.teacher.name,
                    user_id: this.teacher.user_id
                };
                http
                    .post("/createTeacher", data)
                    .then(() => {
                        this.$router.push('/listTeachers');
                    })
                    .catch(e => {
                        console.log(e);
                    });
            },
            getUsers() {
                http
                    .get("/listTeachersHasNotUser")
                    .then(response => {
                        this.users = response.data;
                    })
                    .catch(e => {
                        console.log(e);
                    });
            }
        },
        mounted(){
          this.currentUserRole();
            this.getUsers();
        }
    }
</script>