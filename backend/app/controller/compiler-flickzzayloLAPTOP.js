var globalFunctions = require('../config/global.function');
const axios = require('axios');

const options = {
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
    lang: 'java',
    code: `import java.util.Scanner;

    public class Main {
        public static void main(String[] args) {
            String str = "";
            Scanner scan = new Scanner(System.in);
            str = scan.nextLine();
            int a = scan.nextInt();
            if(str.contains("f") && a==0){
                System.out.println("yes");
            }else{
                System.out.println("no");
            }
        }
    }`,
    input: 'asdf\n0',
  }
};

exports.code = async (req, res) => {
    try {
        const response = await axios.request(options);
        console.log(response.data);
        globalFunctions.sendResult(res, 'Код выполнен');

    } catch (error) {
        console.log("Error");
        console.error(error);
        globalFunctions.sendResult(res, error);
    }
}