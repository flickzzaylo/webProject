import { createWebHistory, createRouter } from "vue-router";
//import compiler from "./components/compiler/compiler"

const routes = [];
const router = createRouter({
    history: createWebHistory(),
    routes,
});


router.beforeEach((to, from, next) => {
    document.title = to.meta.title || 'Комлятор онлайн';
    next();
});

export default router;