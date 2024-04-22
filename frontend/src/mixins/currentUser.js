import http from "../http-common"
export const userRole = {
    data(){
        return{
            user: ""
        }
    },
    computed: {
        async currentUserRole() {
            this.getCurrentUser();
            let role = null;
            try {
                const response = await http.get('/roleByUser/' + this.user);
                role = response.data[0].role_id;
            }catch (e){
                console.log(e);
            }
            return role;
        }
    },
    methods:{
        getCurrentUser(){
            this.user = this.$store.state.auth.user.login;
        }
    }
}