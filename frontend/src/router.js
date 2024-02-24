import { createWebHistory, createRouter } from "vue-router";
import compiler from "./components/compiler/compiler"
import listDisciplines from "./components/discipline/listDisciplines"
import discipline from "./components/discipline/Discipline"
import addDiscipline from "./components/discipline/addDiscipline"

const routes = [
    {
        path: "/compiler",
        name: "compiler",
        component: compiler,
        meta: {
            title: "Компилятор"
        }
    },
    {
        path: "/listDisciplines",
        name: "listDisciplines",
        component: listDisciplines,
        meta:{
            title: "Список дисциплин"
        }
    },
    {
        path: "/discipline/:id",
        name: "discipline-details",
        component: discipline,
        props: true,
        meta:{
            title: "Данные дисциплины"
        }
    },
    {
        path: "/addDiscipline",
        name: "add-discipline",
        component: addDiscipline,
        meta:{
            title: "Добавление дисциплины"
        }
    }
];
const router = createRouter({
    history: createWebHistory(),
    routes,
});


router.beforeEach((to, from, next) => {
    document.title = to.meta.title || 'Комлятор онлайн';
    next();
});

export default router;