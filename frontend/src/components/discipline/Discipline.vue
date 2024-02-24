<template>
    <div v-if="this.discipline">
        Дисциплина
        <div v-if="!submitted">
            <form @submit="updateDiscipline">
                <input type="text" name="name" id="name" placeholder="Наименование" required v-model="discipline.name">
                <input type="submit" value="Обновить">
            </form>
            <button v-on:click="deleteDiscipline()">Удалить</button>
        </div>
        <div v-else>
            <h4>Запись обновлена</h4>
            <router-link to="/listDisciplines">Вернуться к списку дисциплин</router-link>
        </div>
    </div>
</template>

<script>
import http from "../../http-common"
export default{
    name: "discipline-details",
    props: ['id'],
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
            this.getDiscipline();
        }
}
</script>