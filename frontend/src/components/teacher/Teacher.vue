<template>
    <div v-if="teacher && this.role===3" class="container">
      <div class="row justify-content-center">
        <div class="col-md-8">
          <div class="text-center">
            <h3 class="text-white mb-3" style="background-color: #007bff; padding: 10px;">Данные преподавателей</h3>
        <form @submit="updateTeacher" class="text-left">
            <div class="form-group">
              <label for="name" class="text-dark">Фамилия Имя Отчество:</label>
                <input class="form-control" type="text" name="name" id="name" placeholder="ФИО" required v-model="teacher.name">
            </div>
            <div class="form-group">
              <label for="name" class="text-dark">Выберите логин преподавателя:</label>
                <select class="form-select form-control-dark" required v-model="teacher.user_id">
                    <option value="" disabled selected>Выберите пользователя</option>
                    <option v-for="user in users" v-bind:key="user.id" v-bind:value="user.id">
                        {{user.login}}
                    </option>
                </select>
            </div>
          <div class="row mt-3">
            <div class="col">
              <button type="submit" value="Обновить" class="btn btn-primary btn-block">Обновить</button>
            </div>
            <div class="col">
                <button v-on:click="deleteTeacher()" class="btn btn-danger btn-block">Удалить</button>
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