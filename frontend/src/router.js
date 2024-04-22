import { createWebHistory, createRouter } from "vue-router";
import store from "./store/index";
import compiler from "./components/compiler/compiler"
import listDisciplines from "./components/discipline/listDisciplines"
import discipline from "./components/discipline/Discipline"
import addDiscipline from "./components/discipline/addDiscipline"
import listProgLang from "./components/progLanguage/listProgLanguages"
import progLang from "./components/progLanguage/ProgLang"
import addProgLang from "./components/progLanguage/addProgLang"
import role from "./components/role/Role"
import addRole from "./components/role/addRole"
import listRoles from "./components/role/listRoles"
import user from "./components/user/User"
import listUsers from "./components/user/listUsers"
import teacher from "./components/teacher/Teacher"
import listTeachers from "./components/teacher/listTeachers"
import addTeacher from "./components/teacher/addTeacher"
import listTeacherDisciplines from "./components/teacherDiscipline/listTeacherDisciplines"
import addTeacherDiscipline from "./components/teacherDiscipline/addTeacherDiscipline"
import listTasksByDiscipline from "./components/task/listTDiscipline.vue"
import listTasksByDisciplineAndTask from "./components/task/listTasksByDiscipline.vue"
import listTasksByUsers from "./components/task/listTasksByUsers.vue";
import addUser from "./components/user/addUser.vue";
import addTask from "./components/task/addTask.vue";
import commentModal from "./components/task/commentModal.vue";
import login from "./components/authorization/Login.vue";

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
    },
    {
        path: "/listProgLang",
        name: "listProgLang",
        component: listProgLang,
        meta:{
            title: "Список языков программирования"
        }
    },
    {
        path: "/proglang/:id",
        name: "proglang-details",
        component: progLang,
        props: true,
        meta:{
            title: "Данные языка"
        }
    },
    {
        path: "/addProgLang",
        name: "AddProgLang",
        component: addProgLang,
        meta:{
            title: "Добавление языка"
        }
    },
    {
        path: "/listRoles",
        name: "listRoles",
        component: listRoles,
        meta:{
            title: "Список ролей"
        }
    },
    {
        path: "/role/:id",
        name: "role-details",
        component: role,
        props: true,
        meta:{
            title: "Данные роли"
        }
    },
    {
        path: "/addRole",
        name: "AddRole",
        component: addRole,
        meta:{
            title: "Добавление роли"
        }
    },
    {
        path: "/listUsers",
        name: "ListUsers",
        component: listUsers,
        meta:{
            title: "Список пользователей"
        }
    },
    {
        path: "/user/:id",
        name: "user-details",
        component: user,
        props: true,
        meta:{
            title: "Данные пользователя"
        }
    },
    {
        path: "/listTeachers",
        name: "ListTeachers",
        component: listTeachers,
        meta:{
            title: "Список преподавателей"
        }
    },
    {
        path: "/teacher/:id",
        name: "teacher-details",
        component: teacher,
        props: true,
        meta:{
            title: "Данные преподавателя"
        }
    },
    {
        path: "/addTeacher",
        name: "AddTeacher",
        component: addTeacher,
        meta:{
            title: "Добавление преподавателя"
        }
    },
    {
        path: "/listTeacherDisciplines",
        name: "ListTeacherDisciplines",
        component: listTeacherDisciplines,
        meta:{
            title: "Список дисциплин преподавателей"
        }
    },
    {
        path: "/addTeacherDiscipline",
        name: "AddTeacherDiscipline",
        component: addTeacherDiscipline,
        meta:{
            title: "Добавление дисциплины преподавателя"
        }
    },
    {
        path: "/listTasks",
        name: "ListTeacherDisciplinesInTask",
        component: listTasksByDiscipline,
        meta:{
            title: "Список задач"
        }
    },
    {
        path: "/listTasksByD/:id",
        name: "listTasksByD",
        props: true,
        component: listTasksByDisciplineAndTask,
        meta: {
            title: "Список задач"
        }
    },
    {
        path: "/tasksByUserId/:id",
        name: "tasksByUsers",
        props: true,
        component: listTasksByUsers,
        meta:{
            title: "Список задач"
        }
    },
    {
        path: "/addUser",
        name: "addUser",
        component: addUser,
        meta:{
            title: "Добавление пользователя"
        }
    },
    {
        path: "/addTask",
        name: "addTask",
        component: addTask,
        meta: {
            title: "Добавления задания"
        }
    },
    {
        path:"/commentModal",
        name: "comment-modal",
        component: commentModal,
        props: true,
        meta:{
            title: "Редактирование комментария",
            requiredAuth: true
        }
    },
    {
        path:"/login",
        name: "LoginUser",
        component: login,
        meta:{
            title: "Вход"
        }
    }
];
const router = createRouter({
    history: createWebHistory(),
    routes,
});


router.beforeEach(async (to, from, next) => {
    document.title = to.meta.title || 'Комлятор онлайн';
    const auth = await store.getters["auth/isTokenActive"];
    if (auth) {
        return next();
    }
    else if (!auth && to.meta.requiredAuth) {
        const user = JSON.parse(localStorage.getItem("user"));
        await store.dispatch("auth/refreshToken", user)
            .then(() => {
                return next();
            })
            .catch(() => {
                return next({path: "/login"});
            });
        return next({ path: "/login" });
    }
    return next();
});

export default router;