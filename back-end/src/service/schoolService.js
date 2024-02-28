// const multer = require('multer');
// const upload = multer({dest: 'uploads/'});
const fs = require('node:fs'); // Necesario para la función saveExcel
const XLSX = require('xlsx');
const axios = require('axios');
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

    async getSchool(modular_code) {
        try {
            const result = await schoolRepository.getSchool(modular_code);

            return result;
        } catch(err) {
            console.error('Error en getSchool en schoolService.js', err.message);
            throw err;
        }
    }

    async enrollSchool(requestBody, requestFile) {
        try {
            const excelStudents = requestFile;
            console.log('Datos del Excel', excelStudents);
            //Esto me devuelve: ./uploads/estudiantes.xlsx -> Pero creo yo que la Ruta correcta es: ../../uploads/estudiantes.xlsx
            const excelPath = saveExcel(excelStudents);

            //RECOPILAR DATOS DEL EXCEL
            const dataSheet = readExcel(excelPath);

            //CREO QUE TAMBIÉN LE PUEDO HACER VALIDACIONES AL EXCEL

            //LLAMAR A REPOSITORY
            const result = await schoolRepository.enrollSchool(requestBody, dataSheet);
            
            return result;
        } catch(err) {
            console.error('Error en enrollSchool de schoolService.js', err.message);
            throw err;
        }
    }

    async updateSchool(requestBody, requestFile, current_modular_code) {
        try {

            const {
                /*modular_code,*/ name_school,
                director_name, director_lastname, director_cellphone, director_email,
                address,
                district_name,
                province_name,
                department_name
            } = requestBody;

            const excelStudents = requestFile;
            const dataSchool = {};

            //Obteniendo los datos actuales de la Escuela
            const responseEscuela = await axios.get(`http://localhost:3000/getSchool/${current_modular_code}`);
            const datosEscuela = responseEscuela.data[0];

            // modular_code === ''? dataSchool['modular_code'] = datosEscuela[0]: dataSchool['modular_code'] = modular_code;
            name_school === ''? dataSchool['name_school'] = datosEscuela[1]: dataSchool['name_school'] = name_school;
            director_name === ''? dataSchool['director_name'] = datosEscuela[2]: dataSchool['director_name'] = director_name;
            director_lastname === ''? dataSchool['director_lastname'] = datosEscuela[3]: dataSchool['director_lastname'] = director_lastname;
            director_cellphone === ''? dataSchool['director_cellphone'] = datosEscuela[4]: dataSchool['director_cellphone'] = director_cellphone;
            director_email === ''? dataSchool['director_email'] = datosEscuela[5]: dataSchool['director_email'] = director_email;
            address === ''? dataSchool['address'] = datosEscuela[6]: dataSchool['address'] = address;
            district_name === 'undefined'? dataSchool['district_name'] = datosEscuela[7]: dataSchool['district_name'] = district_name;
            province_name === 'undefined'? dataSchool['province_name'] = datosEscuela[8]: dataSchool['province_name'] = province_name;
            department_name === 'undefined'? dataSchool['department_name'] = datosEscuela[9]: dataSchool['department_name'] = department_name;

            dataSchool['id_director'] = datosEscuela[10];
            dataSchool['id_location'] = datosEscuela[11];
            dataSchool['id_district'] = datosEscuela[12];
            dataSchool['id_province'] = datosEscuela[13];
            dataSchool['id_department'] = datosEscuela[14];
            
            if(excelStudents !== undefined) {
                console.log('El excel NO es una cadena vacía.');
                //Esto me devuelve: ./uploads/estudiantes.xlsx
                const excelPath = saveExcel(excelStudents);

                //RECOPILAR DATOS DEL EXCEL
                const dataSheet = readExcel(excelPath);

                dataSchool['excelStudents'] = dataSheet;
            }

            const result = await schoolRepository.updateSchool(dataSchool, current_modular_code);

            //ACÁ VEMOS QUE SE GUARDA EN EL OBJETO, CUANDO PASEN TALES COSAS
            console.log('Este es el Objeto que enviaré a REPOSITORY', dataSchool);

            return result;
        } catch(err) {
            console.error('', err.message);
        }
    }

    async deleteSchool(modular_code) {
        try {

            const response = await axios.get(`http://localhost:3000/getSchool/${modular_code}`);
            const datosEscuela = response.data[0];

            // const response2 = await axios.get(`http://localhost:3000/deleteProgram/${}`);

            const ids = {
                id_director: datosEscuela[10],
                id_location: datosEscuela[11],
                id_district: datosEscuela[12],
                id_province: datosEscuela[13],
                id_department: datosEscuela[14]
            }

            const result = await schoolRepository.deleteSchool(modular_code, ids);

            return result;
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
    let dataSheet = XLSX.utils.sheet_to_json(workBook.Sheets[sheet]); // Se utiliza la variable workBook que creamos, y aplicamos el método Sheets -> y dentro de los [ ] colocamos a la Variable 'sheet' que contiene la HOJA que queramos usar

    console.log('Antes', dataSheet);
    
    dataSheet = dataSheet.map(student => {
        const dni = String(student["dni"]);
        const student_name = student["nombre"]
        const student_lastname = student["apellidos"];
        const birth_date_convert = XLSX.SSF.parse_date_code(student["fecha_nacimiento"]);
        const birth_date = `${birth_date_convert.d}/${birth_date_convert.m}/${birth_date_convert.y}`;
        const gender = student["genero"]
        return {
            dni,
            student_name,
            student_lastname,
            birth_date,
            gender
        }
    });
    console.log('Después', dataSheet);

    return dataSheet;
}



module.exports = {
    SchoolService
}