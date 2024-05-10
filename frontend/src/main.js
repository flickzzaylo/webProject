import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store';
import {globalVariables} from './global.variables'
const app = createApp(App)
createApp(router)
app.use(router)
app.use(store)
app.config.globalProperties.globalVariables = globalVariables;
app.mount('#app')

