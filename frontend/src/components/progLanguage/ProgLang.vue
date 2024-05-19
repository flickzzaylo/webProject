<template>
    <div v-if="this.proglang && this.role===3" class="container">
      <div class="row justify-content-center">
        <div class="col-md-8">
          <div class="text-center">
            <h3 class="text-white mb-3" style="background-color: #007bff; padding: 10px;">Язык программирования</h3>
        <div v-if="!submitted">
            <form @submit="updateProgLang" class="text-left">
              <div class="form-group">
                <label for="name" class="text-dark">Наименование:</label>
                <input class="form-control" type="text" name="name" id="name" placeholder="Наименование" required v-model="proglang.name">
              </div>
              <div class="row mt-3">
                <div class="col">
                  <button type="submit" class="btn btn-primary btn-block">Обновить</button>
                </div>
              <div class="col">
               <button v-on:click="deleteProgLang()" class="btn btn-danger btn-block">Удалить</button>
              </div>
              </div>
            </form>
        </div>
        <div v-else>
            <h4 class="text-center">Запись обновлена</h4>
            <router-link to="/listProgLang" class="btn btn-primary btn-block mt-3">Вернуться к списку дисциплин</router-link>
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
    name: "proglang-details",
    props: ['id'],
    mixins:[userRole],
    data(){
        return{
            proglang: null,
            submitted: false
        };
    },
    methods: {
            getProgLang() {
                http
                    .get("/proglang/" + this.id)
                    .then(response => {
                        this.proglang = response.data;
                    })
                    .catch(e => {
                        console.log(e);
                    });
            },
            updateProgLang(e) {
                e.preventDefault();
                var data = {
                    name: this.proglang.name
                };

                http
                    .post("/updateProgLang/" + this.proglang.id, data)
                    .then(() => {
                    })
                    .catch(e => {
                        console.log(e);
                    });
                this.submitted = true;
            },
            deleteProgLang() {
                http
                    .post("/deleteProgLang/" + this.proglang.id)
                    .then(() => {
                        this.$router.push('/listProgLang');
                    })
                    .catch(e => {
                        console.log(e);
                    });
            }
        },
        mounted() {
            this.currentUserRole();
            this.getProgLang();
        }
}
</script>