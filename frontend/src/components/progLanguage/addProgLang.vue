<template>
    <div v-if="this.role===3" class="container">
      <div class="row justify-content-center">
        <div class="col-md-8">
          <div class="text-center">
            <h3 class="text-white mb-3" style="background-color: #007bff; padding: 10px;">Добавление языка программирования</h3>
        <div v-if="!submitted">
            <form @submit="addProgLang" class="text-left">
              <div class="form-group">
                <label for="name" class="text-dark">Наименование языка программирования:</label>
                <input type="text" name="name" id="name" placeholder="Наименование языка" required v-model="proglang.name" class="form-control form-control-dark">
              </div>
                <button type="submit" class="btn btn-primary btn-block mt-3">Добавить</button>
            </form>
        </div>
        <div v-else>
            <h4 class="text-center">Запись добавлена</h4>
            <div class="text-center">
                <button class="btn btn-primary btn-block mt-3" v-on:click="newProgLang">Добавить новый язык</button>
            </div>
            <div class="text-center mt-3">
                <router-link  class="btn btn-secondary btn-block" to="/listProgLang">Вернуться к списку языков</router-link>
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
    name:"AddProgLang",
  mixins: [userRole],
    data(){
        return{
            proglang:{
                id:null,
                name: ""
            },
            submitted: false
        };
    },
    methods: {
        addProgLang(e){
            e.preventDefault();
            var data = {
                name: this.proglang.name
            };
            http
                    .post("/createProgLang", data)
                    .then(response => {
                        this.proglang.id = response.data.id;
                    })
                    .catch(e => {
                        console.log(e);
                    });

                this.submitted = true;
        },
        newProgLang() {
                this.submitted = false;
                this.proglang = {
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

