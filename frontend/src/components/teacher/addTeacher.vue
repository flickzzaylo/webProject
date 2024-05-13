<template>
    <div v-if="this.role===3" class="container">
      <div class="row justify-content-center">
        <div class="col-md-8">
          <div class="text-center">
            <h3 class="text-white mb-3" style="background-color: #007bff; padding: 10px;">Добавление преподавателей</h3>
        <form @submit="addTeacher" class="text-left">
          <div class="form-group">
            <label for="name" class="text-dark">Фамилия Имя Отчество:</label>
            <input type="text" name="name" id="name" placeholder="ФИО" required v-model="teacher.name" class="form-control form-control-dark">
          </div>
            <div class="form-group">
              <label for="name" class="text-dark">Логин преподавателя:</label>
                <select class="form-control form-control-dark" required v-model="teacher.user_id">
                    <option value="" disabled selected>Выберите пользователя</option>
                    <option class="form-select" v-for="user in users" v-bind:key="user.id" v-bind:value="user.id">
                        {{user.login}}
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