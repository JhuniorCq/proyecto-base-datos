

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

const funcion = (evento) => {
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

        //AHORA CREARÉ UN OBJETO PARA ENVIAR AL BACKEND -> RECORDAR QUE LA TABLA SCHOOLS SE DIVIDIÓ EN MÁS TABLAS
        //YO CREO QUE DIRECCIÓN DEBE ESTAR EN SCHOOL Y QUE DEPARTAMENTO, PROVINCIA Y DISTRITO EN UNA TABLA NUEVA Locations
        //O QUE DIRECCION, DEPARTAMENTO, PROVINCIA Y DISTRITO SEAN DE UNA TABLA APARTE -> Location

        console.log(inputExcelValue)

        //VAMO A ENVIAR TODOS LOS DATOS AL SERVIDOR YA :3

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



formulario.addEventListener('submit', funcion);
inputExcel.addEventListener('change', validarExtensionExcel);

export {inputExcel};