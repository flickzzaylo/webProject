<template>
    <div v-if="this.roleUser && this.role===3" class="container">
      <div class="row justify-content-center">
        <div class="col-md-8">
          <div class="text-center">
            <h3 class="text-white mb-3" style="background-color: #007bff; padding: 10px;">Роль</h3>
        <div v-if="!submitted">
            <form @submit="updateRole" class="text-left">
              <div class="form-group">
                <label for="name" class="text-dark">Наименование:</label>
                <input class="form-control" type="text" name="name" id="name" placeholder="Наименование" required v-model="roleUser.name">
              </div>
              <div class="row mt-3">
                <div class="col">
                  <button class="btn btn-primary btn-block" type="submit" value="Обновить">Обновить</button>
                </div>
                <div class="col">
                  <button class="btn btn-danger btn-block" v-on:click="deleteRole()">Удалить</button>
                </div>
              </div>
            </form>
        </div>
        <div v-else>
            <h4 class="text-center">Запись обновлена</h4>
            <router-link to="/listRoles" class="btn btn-primary btn-block mt-3">Вернуться к списку ролей</router-link>
        </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import http from "../../http-common"
import {userRole} from "@/mixins/currentUser";
import '@/components/styles/dataStyle.css'
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