<template>
    <div>
        Добавление языка программирования
        <div v-if="!submitted">
            <form @submit="addProgLang">
                <input type="text" name="name" id="name" placeholder="Наименование языка" required v-model="proglang.name">
                <input type="submit" value="Добавить">
            </form>
        </div>
        <div v-else>
            <h4>Запись добавлена</h4>
            <div>
                <button v-on:click="newProgLang">Добавить новый язык</button>
            </div>
            <div>
                <router-link class="item" to="/listProgLang">Вернуться к списку языков</router-link>
            </div>
        </div>
    </div>
</template>

<script>
import http from "../../http-common"
export default{
    name:"AddProgLang",
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
    }
}
</script>