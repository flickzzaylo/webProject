<template>
  <div v-if="this.role===3 || this.role===1" class="container">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="text-center">
          <h3 class="text-white mb-3" style="background-color: #007bff; padding: 10px;">Добавление учебной дисциплины</h3>
          <div v-if="!submitted">
            <form @submit.prevent="addDiscipline" class="text-left">
              <div class="form-group">
                <label for="name" class="text-dark">Наименование дисциплины:</label>
                <input type="text" name="name" id="name" placeholder="Наименование дисциплины" required v-model="discipline.name" class="form-control form-control-dark">
              </div>
              <button type="submit" class="btn btn-primary btn-block mt-3">Добавить</button>
            </form>
          </div>
          <div v-else>
            <h4 class="text-center">Запись добавлена</h4>
            <div class="text-center">
              <button v-on:click="newDiscipline" class="btn btn-primary btn-block mt-3">Добавить новую дисциплину</button>
            </div>
            <div class="text-center mt-3">
              <router-link to="/listDisciplines" class="btn btn-secondary btn-block">Вернуться к списку дисциплин</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import http from "../../http-common"
import {userRole} from "@/mixins/currentUser";
import '@/components/styles/addStyle.css'
export default{
    name:"AddDiscipline",
  mixins: [userRole],
    data(){
        return{
            discipline:{
                id:null,
                name: ""
            },
            submitted: false
        };
    },
    methods: {
        addDiscipline(e){
            e.preventDefault();
            var data = {
                name: this.discipline.name
            };
            http
                    .post("/createDiscipline", data)
                    .then(response => { // запрос выполнился успешно
                        this.discipline.id = response.data.id;
                    })
                    .catch(e => { // при выполнении запроса возникли ошибки
                        console.log(e);
                    });

                this.submitted = true;
        },
        newDiscipline() {
                this.submitted = false;
                this.discipline = {
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