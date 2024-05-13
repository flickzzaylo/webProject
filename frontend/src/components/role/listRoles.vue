<template>
    <div v-if="this.role===3" class="container">
      <div class="row justify-content-center">
        <div class="col-md-8">
          <div class="text-center">
            <h3 class="text-white mb-3" style="background-color: #007bff; padding: 10px;">Список ролей</h3>
        <ul class="list-group">
            <li class="list-group-item" v-for="(role,index) in roles" :key="index">
                <router-link :to="{
                    name: 'role-details',
                    params: {id: role.id}
                }" class="nav-link text-dark">
                  <span style="font-family: Arial, sans-serif; font-size: 18px; text-decoration: none;">
                    {{ role.name }}
                </span>
                </router-link>
            </li>
        </ul>
        <router-link class="btn btn-primary btn-block mt-3" to="/addRole">Добавить роль</router-link>
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
    name: "ListRoles",
  mixins: [userRole],
    data()
    {
        return{
        roles:[]
    };
    },
methods:{
    async getRoles(){
      try {
        const response = await http.get("/listRoles");
        this.roles = response.data;
      }catch (e){
        console.log('Roles vue error: ' + e);
      }
    }
  },
    mounted(){
      this.currentUserRole();
        this.getRoles();
    }
}
</script>