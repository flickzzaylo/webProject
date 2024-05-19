<template>
  <div v-if="this.role===3" class="container">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="text-center">
          <h3 class="text-white mb-3" style="background-color: #007bff; padding: 10px;">Компилятор</h3>
          <div class="form-group">
            <label class="text-dark">Выберите язык программирования:</label>
            <select v-model="selected" class="form-control form-control-dark">
              <option value="" disabled selected>Выберите язык программирования</option>
              <option  v-for="(language,languageInput) in languages" :key="languageInput" :value="languageInput" >{{ language }}</option>
            </select>
          </div>
          <div class="form-group">
            <label class="text-dark">Код программы:</label>
            <textarea v-model="code" class="form-control form-control-dark" placeholder="Введите код" rows="20" max-rows="30" style="resize: none;"></textarea>
          </div>
          <div class="form-group">
            <label class="text-dark">Входные данные:</label>
            <textarea v-model="input" class="form-control form-control-dark" placeholder="Введите входные данные" rows="5" max-rows="15" style="resize: none;"></textarea>
          </div>
          <button v-on:click="compileCode()" class="btn btn-primary btn-block">Выполнить код</button>
          <br>
          <h5 id="answer">{{ output }}</h5>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import http from "../../http-common"
import {userRole} from "@/mixins/currentUser";
    export default {
        name: "TheCompiler",
      mixins: [userRole],
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
        },
      mounted() {
          this.currentUserRole();
      }
    };
</script>

<style>
.form-control-dark {
  background-color: aliceblue !important;
  color: #000;
  border-color: #6c757d;
}

.form-control-dark:focus {
  border-color: #6c757d !important;
  box-shadow: none !important;
}
</style>