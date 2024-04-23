<template>
    <div v-if="this.role===3">
        Список языков программирования
        <ul>
            <li v-for="(progLang,index) in progLangs" :key="index">
                <router-link :to="{
                    name: 'proglang-details',
                    params: {id: progLang.id}
                }">
                {{ progLang.name }}
                </router-link>
            </li>
        </ul>
        <router-link class="item" to="/addProgLang">Добавить дисциплину</router-link>
    </div>

</template>

<script>
import http from "../../http-common"
import {userRole} from "@/mixins/currentUser";
export default{
    name: "ListProgLang",
  mixins: [userRole],
    data()
    {
        return{
        progLangs:[]
    };
    },
    methods:{
        getProgLangs(){
            http
            .get('/listProgLang')
            .then(response=>{
                this.progLangs = response.data;
            })
            .catch(e=>{
                console.log(e);
            })
        }
    },
    mounted(){
      this.currentUserRole();
        this.getProgLangs();
    }
}
</script>