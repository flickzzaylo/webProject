<template>
    <div>
        Список ролей
        <ul>
            <li v-for="(role,index) in roles" :key="index">
                <router-link :to="{
                    name: 'role-details',
                    params: {id: role.id}
                }">
                {{ role.name }}
                </router-link>
            </li>
        </ul>
        <router-link class="item" to="/addRole">Добавить роль</router-link>
    </div>
</template>

<script>
import http from "../../http-common"
export default{
    name: "ListRoles",
    data()
    {
        return{
        roles:[]
    };
    },
    methods:{
        getRoles(){
            http
            .get('/listRoles')
            .then(response=>{
                this.roles = response.data;
            })
            .catch(e=>{
                console.log(e);
            })
        }
    },
    mounted(){
        this.getRoles();
    }
}
</script>