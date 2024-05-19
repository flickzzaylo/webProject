<template>
    <div v-if="this.role===3" class="container">
      <div class="row justify-content-center">
        <div class="col-md-8">
          <div class="text-center">
            <h3 class="text-white mb-3" style="background-color: #007bff; padding: 10px;">Список языков программирования</h3>
        <ul class="list-group">
            <li class="list-group-item" v-for="(progLang,index) in progLangs" :key="index">
                <router-link :to="{
                    name: 'proglang-details',
                    params: {id: progLang.id}
                }" class="nav-link text-dark">
                  <span style="font-family: Arial, sans-serif; font-size: 18px; text-decoration: none;">
                    {{ progLang.name }}
                  </span>
                </router-link>
            </li>
        </ul>
        <router-link class="btn btn-primary btn-block mt-3" to="/addProgLang">Добавить дисциплину</router-link>
          </div>
        </div>
      </div>
    </div>

</template>

<script>
import http from "../../http-common"
import {userRole} from "@/mixins/currentUser";
import '@/components/styles/listStyle.css'
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