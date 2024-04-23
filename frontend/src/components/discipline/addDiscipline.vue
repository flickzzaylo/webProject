<template>
    <div v-if="this.role===3 || this.role===1">
        Добавление учебной дисциплины
        <div v-if="!submitted">
            <form @submit="addDiscipline">
                <input type="text" name="name" id="name" placeholder="Наименование дисциплины" required v-model="discipline.name">
                <input type="submit" value="Добавить">
            </form>
        </div>
        <div v-else>
            <h4>Запись добавлена</h4>
            <div>
                <button v-on:click="newDiscipline">Добавить новую дисциплину</button>
            </div>
            <div>
                <router-link class="item" to="/listDisciplines">Вернуться к списку дисциплин</router-link>
            </div>
        </div>
    </div>
</template>

<script>
import http from "../../http-common"
import {userRole} from "@/mixins/currentUser";
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