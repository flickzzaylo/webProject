<template>
        <h3>Компилятор</h3>
        <a>Выберите язык программирования: </a>
        <select v-model="selected">
            <option v-for="(language,languageInput) in languages" :key="languageInput" :value="languageInput" >{{ language }}</option>
        </select>
        <br>
        <br>
        <a>Код программы:</a>
        <br>
        <textarea v-model="code" placeholder="Введите код" rows="20" max-rows="30" style="width:80%;resize: none;"></textarea>
        <br>
        <a>Входные данные</a>
        <br>
        <textarea v-model="input" rows="5" max-rows="15" style="width:50%;resize: none;" placeholder="Введите входные данные"></textarea>
        <br>
        <button v-on:click="compileCode()">Выполнить код</button>
        <br>
        <br>
        <label id="answer" style="color: yellowgreen;">{{ output }}</label>
</template>

<script>
import http from "../../http-common"
    export default {
        name: "TheCompiler",
        data() {
            return {
                languages:{
                    "c_cpp":"C++",
                    "java":"Java",
                    "nodejs":"Node.js",
                    "csharp":"C#",
                    "kotlin":"Kotlin"
                },
                selected:'',
                code:'',
                input:'',
                output:''
            };
        },
        methods:{
            showInfo(){
                console.log(this.selected);
                console.log(this.code);
                console.log(this.input);
            },
            compileCode(){
                const answer = document.getElementById("answer");
                if(this.selected==''){
                    this.output='Выберите язык программирования!';
                    answer.style.color="red";
                    return;
                }
                if(this.code==''){
                    this.output='Введите код программы!';
                    answer.style.color="red";
                    return;
                }
                this.output='Загрузка...'
                var options={
                    method: 'POST',
                    url: 'https://code-compiler10.p.rapidapi.com/',
                    headers: {
                        'content-type': 'application/json',
                        'x-compile': 'rapidapi',
                        'Content-Type': 'application/json',
                        'X-RapidAPI-Key': 'c3e1125562mshf5308ad52d975d3p18b258jsndfe0ae36894e',
                        'X-RapidAPI-Host': 'code-compiler10.p.rapidapi.com'
                    },
                    data: {
                        langEnum: [
                        'php',
                        'python',
                        'c',
                        'c_cpp',
                        'csharp',
                        'kotlin',
                        'golang',
                        'r',
                        'java',
                        'typescript',
                        'nodejs',
                        'ruby',
                        'perl',
                        'swift',
                        'fortran',
                        'bash'
                        ],
                        lang: this.selected,
                        code: this.code,
                        input: this.input,
                    }
                };
                http
                    .post("/compileCode",options)
                    .then((response)=>{
                        this.output = response.data.output;
                        answer.style.color="green";
                        console.log("good");
                    }
                    )
                    .catch(()=>{
                        answer.style.color="red";
                        console.log("bad");
                    }
                    );
            }
        }
    };
</script>
