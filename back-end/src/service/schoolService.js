// const multer = require('multer');
// const upload = multer({dest: 'uploads/'});
const fs = require('node:fs');
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
            const excelPath = this.saveExcel(excelStudents);

            //SIMULARÉ ESTO DEL EXCEL CON LA DEPENDENCIA MULTER -> EN OTRO ARCHIVO


            console.log(excelPath)
            console.log('Termina');

            //LLAMAR A REPOSITORY
            const result = await schoolRepository.enrollSchool(requestBody);
            
            return result;
        } catch(err) {
            console.error('Error en enrollSchool de schoolService.js', err.message);
        }
    }

    saveExcel(file) { //Con esta función vamos a 
        const newPath = `./uploads/${file.originalname}`;
        fs.renameSync(file.path, newPath);
        return newPath;
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

module.exports = {
    SchoolService
}