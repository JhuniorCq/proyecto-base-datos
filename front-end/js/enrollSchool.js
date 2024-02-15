

import {validarDatosEscuela, validarDatosDirector, validarDatosUbicacion, validarExcelEstudiantes, validarExtensionExcel} from './validations.js';

const formulario = document.querySelector('.formulario');
const codigoModular = document.getElementById('codigo-modular');
const nombreEscuela = document.getElementById('nombre-escuela');
const direccionEscuela = document.getElementById('direccion');
const departamentoSelect = document.getElementById('departamentoSelect');
const provinciaSelect = document.getElementById('provinciaSelect');
const distritoSelect = document.getElementById('distritoSelect');
const inputExcel = document.getElementById('input-excel');

const nombresDirector = document.getElementById('nombres-director');
const apellidosDirector = document.getElementById('apellidos-director');
const celularDirector = document.getElementById('celular');
const emailDirector = document.getElementById('email');

const enrollSchool = async (evento) => {
    //Evitar que el formulario se envíe de forma predeterminada, y que se recargue la página
    evento.preventDefault();

    const codigoModularValue = codigoModular.value;
    const nombreEscuelaValue = nombreEscuela.value;
    const direccionEscuelaValue = direccionEscuela.value;
    const departamentoSelectValue = departamentoSelect.value;
    const provinciaSelectValue = provinciaSelect.value;
    const distritoSelectValue = distritoSelect.value;
    const nombresDirectorValue = nombresDirector.value;
    const apellidosDirectorValue = apellidosDirector.value;
    const celularDirectorValue = celularDirector.value;
    const emailDirectorValue = emailDirector.value;
    const inputExcelValue = inputExcel.value;

    //Ejecución y comprobación de las 3 funciones de validación
    if(validarDatosEscuela(codigoModularValue, nombreEscuelaValue, direccionEscuelaValue) && 
        validarDatosUbicacion(departamentoSelectValue, provinciaSelectValue, distritoSelectValue) && 
        validarDatosDirector(nombresDirectorValue, apellidosDirectorValue, celularDirectorValue, emailDirectorValue) && 
        validarExcelEstudiantes(inputExcelValue)) {
        console.log('Datos registrados exitosamente :D');
        alert('Datos registrados exitosamente.');

        // PUEDO DEJAR ESTE IF ASÍ, O HACER QUE ESTE SEA !validarDatosEscuela... y así, y el alert() iría fuera del ID

        console.log(inputExcelValue)

        //VAMO A ENVIAR TODOS LOS DATOS AL SERVIDOR YA :3
        const dataSchool = {
            modular_code: codigoModularValue,
            name_school: nombreEscuelaValue,
            address: direccionEscuelaValue,
            district_name: distritoSelectValue,
            province_name: provinciaSelectValue,
            department_name: departamentoSelectValue,
            director_name: nombresDirectorValue,
            director_lastname: apellidosDirectorValue,
            director_cellphone: celularDirectorValue,
            director_email: emailDirectorValue,
            excelStudents: inputExcelValue
        }
        const url = 'http://localhost:3000/enrollSchool';

        const response = await axiosPost(url, dataSchool);
        
    } else {
        alert('No se registraron los datos');
        return;
    }

    console.log(codigoModular.value);
    console.log(nombreEscuela.value);
    console.log(direccionEscuela.value);
    console.log(departamentoSelect.value);
    console.log(provinciaSelect.value);
    console.log(distritoSelect.value);
    console.log(nombresDirector.value);
    console.log(apellidosDirector.value);
    console.log(celularDirector.value);
    console.log(emailDirector.value);
    console.log(inputExcel.value);
}

const axiosPost = async (url, data) => {
    try {
        const response = await axios.post(url, data);
        return response.data;
    } catch(err) {
        console.error('Error al enviar', err.message);
    }
}


formulario.addEventListener('submit', enrollSchool);
inputExcel.addEventListener('change', validarExtensionExcel);

export {inputExcel};