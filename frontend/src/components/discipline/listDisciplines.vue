<template>

  <div v-if="this.role===3 || this.role===1" class="container">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="text-center">
          <h3 class="text-white mb-3" style="background-color: #007bff; padding: 10px;">Список дисциплин</h3>
          <ul class="list-group">
            <li class="list-group-item" v-for="(discipline,index) in disciplines" :key="index">
              <router-link :to="{
                  name: 'discipline-details',
                  params: {id: discipline.id}
                }" class="nav-link text-dark">
                <span style="font-family: Arial, sans-serif; font-size: 18px; text-decoration: none;">
                  {{ discipline.name }}
                </span>
              </router-link>
            </li>
          </ul>
          <router-link class="btn btn-primary btn-block mt-3" to="/addDiscipline">Добавить дисциплину</router-link>
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
    name: "ListDisciplines",
  mixins: [userRole],
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
      this.currentUserRole();
      this.getDisciplines();
    }
}
</script>