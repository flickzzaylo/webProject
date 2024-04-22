<template>
    <div>
        Список дисциплин
        <ul>
            <li v-for="(discipline,index) in disciplines" :key="index">
                <router-link :to="{
                    name: 'discipline-details',
                    params: {id: discipline.id}
                }">
                {{ discipline.name }}
                </router-link>
            </li>
        </ul>
        <router-link class="item" to="/addDiscipline">Добавить дисциплину</router-link>
    </div>
</template>

<script>
import http from "../../http-common"
export default{
    name: "ListDisciplines",
    data()
    {
        return{
        disciplines:[]
    };
    },
    methods:{
        getDisciplines(){
            http
            .get('/listDisciplines')
            .then(response=>{
                this.disciplines = response.data;
            })
            .catch(e=>{
                console.log(e);
            })
        }
    },
    mounted(){
      this.getDisciplines();
    }
}
</script>