// const multer = require('multer');
// const upload = multer({dest: 'uploads/'});
const fs = require('node:fs'); // Necesario para la función saveExcel
const XLSX = require('xlsx');
const {SchoolRepository} = require('../repository/schoolRepository.js');
const schoolRepository = new SchoolRepository();

class SchoolService {
    
    async getSchools() {
        try {
            //LÓGICA

            //MANEJO DE LA BD -> LLAMAR A REPOSITORY
            const result = await schoolRepository.getSchools();

            return result; //Este result es un result.rows, porque así se retornó en schoolRepository
        } catch(err) {
            console.error('Error en la funcion getSchools en schoolRepository.js', err.message);
        }
    }

    async getSchool() {
        try {

        } catch(err) {
            console.error('', err.message);
        }
    }

    async enrollSchool(requestBody, requestFile) {
        try {
            const excelStudents = requestFile;
            console.log('Datos del Excel', excelStudents);
            //Esto me devuelve: ./uploads/estudiantes.xlsx -> Pero creo yo que la Ruta correcta es: ../../uploads/estudiantes.xlsx
            const excelPath = saveExcel(excelStudents);

            //RECOPILAR DATOS DEL EXCEL
            readExcel(excelPath);

            console.log(excelPath)
            console.log('Termina');

            //LLAMAR A REPOSITORY
            const result = await schoolRepository.enrollSchool(requestBody);
            
            return result;
        } catch(err) {
            console.error('Error en enrollSchool de schoolService.js', err.message);
        }
    }

    

    async deleteSchool() {
        try {

        } catch(err) {
            console.error('', err.message);
        }
    }

    async updateSchool() {
        try {

        } catch(err) {
            console.error('', err.message);
        }
    }

}

const saveExcel = (file) => { //Con esta función vamos a 
    const newPath = `./uploads/${file.originalname}`;
    fs.renameSync(file.path, newPath);
    return newPath;
}

const readExcel = (path) => {
    //Con esto se Lee el Excel
    const workBook = XLSX.readFile(path);
    //Con esto almaceno cada Hoja del Excel en un Array
    const workBookSheets = workBook.SheetNames;
    //Almaceno a la Primera Hoja en la variable 'sheet'
    const sheet = workBookSheets[0];

    //Con esto convierto toda la Hoja en formato JSON, cada FILA será un Objeto -> En Total se Devolverá un ARRAY de OBJETOS
    const dataSheet = XLSX.utils.sheet_to_json(workBook.Sheets[sheet]); // Se utiliza la variable workBook que creamos, y aplicamos el método Sheets -> y dentro de los [ ] colocamos a la Variable 'sheet' que contiene la HOJA que queramos usar

    console.log(dataSheet);
    
    dataSheet.forEach(objeto => {
        console.log(objeto["nombre"]);
    });
}

module.exports = {
    SchoolService
}