<template>
    <div v-if="teacher && this.role===3">
        <h4>Данные преподавателей</h4>
        <form @submit="updateTeacher">
            <div>
                <input type="text" name="name" id="name" placeholder="ФИО" required v-model="teacher.name">
            </div>
            <div>
                <select class="form-select" required v-model="teacher.user_id">
                    <option value="" disabled selected>Выберите пользователя</option>
                    <option v-for="user in users" v-bind:key="user.id" v-bind:value="user.id">
                        {{user.login}}
                    </option>
                </select>
            </div>
            <div>
                <input type="submit" value="Обновить">
            </div>
            <div>
                <button v-on:click="deleteTeacher()">Удалить</button>
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
    import {userRole} from "@/mixins/currentUser";
    export default {
        name: "teacher-details",
        props: ['id'],
      mixins: [userRole],
        data() {
            return {
                teacher: null,
                users: []
            };
        },
        methods: {
            getTeacher() {
                http
                    .get("/teacher/"+ this.id)
                    .then(response => {
                        this.teacher = response.data;
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
            },
            updateTeacher(e) {
                e.preventDefault();
                var data = {
                    name: this.teacher.name,
                    user_id: this.teacher.user_id
                };
                http
                    .post("/updateTeacher/" + this.teacher.id, data)
                    .then(() => {
                        this.$router.push('/listTeachers');
                    })
                    .catch(e => {
                        console.log(e);
                    });
            },
            deleteTeacher() {
                http
                    .post("/deleteTeacher/" + this.teacher.id)
                    .then(() => {
                        this.$router.push('/listTeachers');
                    })
                    .catch(e => {
                        console.log(e);
                    });
            }
        },
        mounted() {
          this.currentUserRole();
            this.getTeacher();
            this.getUsers();
        }
    }
</script>