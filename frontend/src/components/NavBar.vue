<template>
    <div id="app">
        <a class="navbar-brand"><router-link class="item" to="/compiler">Компилятор</router-link></a>
        <a>---</a>
        <a class="navbar-brand"><router-link class="item" to="/listDisciplines">Дисциплины</router-link></a>
        <a>---</a>
        <a class="navbar-brand"><router-link class="item" to="/listProgLang">Языки программирования</router-link></a>
        <a>---</a>
        <a class="navbar-brand"><router-link class="item" to="/listRoles">Роли</router-link></a>
        <a>---</a>
        <a class="navbar-brand"><router-link class="item" to="/listUsers">Пользователи</router-link></a>
        <a>---</a>
        <a class="navbar-brand"><router-link class="item" to="/listTeachers">Преподаватели</router-link></a>
        <a>---</a>
        <a class="navbar-brand"><router-link class="item" to="/listTeacherDisciplines">Дисциплины преподавателей</router-link></a>
        <a>---</a>
        <a class="navbar-brand"><router-link class="item" to="/listTasks">Задачи</router-link></a>
    </div>
</template>

<script>
    export default{
        name: "NavBar",
        data(){
            return {};
        }
    }
</script>