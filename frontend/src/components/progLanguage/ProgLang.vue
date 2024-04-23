<template>
    <div v-if="this.proglang && this.role===3">
        Язык программирования
        <div v-if="!submitted">
            <form @submit="updateProgLang">
                <input type="text" name="name" id="name" placeholder="Наименование" required v-model="proglang.name">
                <input type="submit" value="Обновить">
            </form>
            <button v-on:click="deleteProgLang()">Удалить</button>
        </div>
        <div v-else>
            <h4>Запись обновлена</h4>
            <router-link to="/listProgLang">Вернуться к списку дисциплин</router-link>
        </div>
    </div>
</template>

<script>
import http from "../../http-common"
import {userRole} from "@/mixins/currentUser";
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