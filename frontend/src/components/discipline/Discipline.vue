<template>
  <div v-if="this.discipline && (this.role===3 || this.role===1)" class="container">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="text-center">
          <h3 class="text-white mb-3" style="background-color: #007bff; padding: 10px;">Дисциплина</h3>
          <div v-if="!submitted">
            <form @submit.prevent="updateDiscipline" class="text-left">
              <div class="form-group">
                <label for="name" class="text-dark">Наименование:</label>
                <input type="text" name="name" id="name" placeholder="Наименование" required v-model="discipline.name" class="form-control">
              </div>
              <div class="row mt-3">
                <div class="col">
                  <button type="submit" class="btn btn-primary btn-block">Обновить</button>
                </div>
                <div class="col">
                  <button v-on:click="deleteDiscipline()" class="btn btn-danger btn-block">Удалить</button>
                </div>
              </div>
            </form>
          </div>
          <div v-else>
            <h4 class="text-center">Запись обновлена</h4>
            <router-link to="/listDisciplines" class="btn btn-primary btn-block mt-3">Вернуться к списку дисциплин</router-link>
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
    name: "discipline-details",
    props: ['id'],
  mixins: [userRole],
    data(){
        return{
            discipline: null,
            submitted: false
        };
    },
    methods: {
            getDiscipline() {
                http
                    .get("/discipline/" + this.id)
                    .then(response => {
                        this.discipline = response.data;
                    })
                    .catch(e => {
                        console.log(e);
                    });
            },
            updateDiscipline(e) {
                e.preventDefault();
                var data = {
                    name: this.discipline.name
                };

                http
                    .post("/updateDiscipline/" + this.discipline.id, data)
                    .then(() => {
                    })
                    .catch(e => {
                        console.log(e);
                    });
                this.submitted = true;
            },
            deleteDiscipline() {
                http
                    .post("/deleteDiscipline/" + this.discipline.id)
                    .then(() => {
                        this.$router.push('/listDisciplines');
                    })
                    .catch(e => {
                        console.log(e);
                    });
            }
        },
        mounted() {
      this.currentUserRole();
            this.getDiscipline();
        }
}
</script>