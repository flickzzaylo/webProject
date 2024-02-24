<template>
    <div id="app">
        <a class="navbar-brand"><router-link class="item" to="/compiler">Компилятор</router-link></a>
        <a>---</a>
        <a class="navbar-brand"><router-link class="item" to="/listDisciplines">Список дисциплин</router-link></a>
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