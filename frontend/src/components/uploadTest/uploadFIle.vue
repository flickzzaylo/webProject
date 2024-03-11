<template>
  <div>
    Загрузка файлов
    <ul>
      <li v-for="(file, index) in files" :key="index">
        <a @click="downloadZipFile(file)" href="#">Скачать файл</a>
      </li>
    </ul>
  </div>
</template>

<script>
import http from "../../http-common"
import JSZip from 'jszip'
import FileSaver from 'file-saver'

export default {
  name: "upload-file",
  data(){
    return{
      files: []
    }
  },
  methods:{
    getFiles(){
      http
          .get('/listFiles')
          .then(response=>{
            this.files = response.data;
          })
          .catch(e=>{
            console.log(e);
          })
    },
    async downloadZipFile(file){
      const buffer = new Uint8Array(file); // Конвертируем Buffer в Uint8Array
      const blob = new Blob([buffer], { type: 'application/octet-stream' }); // Создаем Blob из Uint8Array
      const zip = new JSZip();
// Теперь можно использовать переменную blob для создания zip файла
      zip.file('file.zip', blob);
      const content = await zip.generateAsync({type:"blob"});
      FileSaver.saveAs(content, 'file.zip');
    }
  },
  mounted() {
    this.getFiles()
  }
}
</script>