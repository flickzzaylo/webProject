import http from "../http-common"
export const userRole = {
    data(){
        return{
            role: null
        }
    },
    methods:{
        currentUserRole() {
            const user = this.$store.state.auth.user.login;
            http
                .get('/roleByUser/'+user)
                .then(response=>{
                    this.role = response.data[0].role_id;
                })
                .catch(e=>{
                    console.log(e);
                })
        }
    }
}