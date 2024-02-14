
import {inputExcel} from './enrollSchool.js';

const validarDatosEscuela = (codigoModularValue, nombreEscuelaValue, direccionEscuelaValue) => {
    if(!codigoModularValue) {
        alert('El campo para el código modular no puede estar vacío.');
        return false;
    } else if(!/^\d{7}$/.test(codigoModularValue)) {
        alert('El código modular debe tener 7 dígitos y contener solo números.')
        return false;
    }

    if(!nombreEscuelaValue){
        alert('El campo para el nombre de la escuela no puede estar vacío.');
        return false;
    } else if(nombreEscuelaValue.length > 60) {
        alert('Como máximo se permite 60 caracteres para el nombre de la escuela.')
        return false;
    }

    //La dirección es un campo opcional
    if(direccionEscuelaValue.length > 100) {
        alert('Como máximo se permite 100 caracteres para la dirección de la escuela.');
        return false;
    }

    return true;
}

const validarDatosUbicacion = (departamentoSelectValue, provinciaSelectValue, distritoSelectValue) => {
    if(!departamentoSelectValue || departamentoSelectValue == 'default') {
        alert('Debe seleccionar un departamento.');
        return false;
    }

    if(!provinciaSelectValue || provinciaSelectValue =='default') {
        alert('Debe seleccionar una provincia.');
        return false;
    }

    if(!distritoSelectValue || distritoSelectValue == 'default') {
        alert('Debe seleccionar un distrito.');
        return false;
    }

    return true;
}

const validarDatosDirector = (nombresDirectorValue, apellidosDirectorValue, celularDirectorValue, emailDirectorValue) => {
    if(!nombresDirectorValue) {
        alert('El campo para el nombre del director no puede estar vacío.');
        return false;
    } else if(nombresDirectorValue.length > 30) {
        alert('Como máximo se permite 30 caracteres para los nombres del director.');
        return false;
    }

    if(!apellidosDirectorValue) {
        alert('El campo para los apellidos del director no puede estar vacío');
        return false;
    } else if(apellidosDirectorValue.length > 30) {
        alert('Como máximo se permiten 30 caracteres para los apellidos del director.');
        return false;
    }

    if(!celularDirectorValue) {
        alert('El campo para el número de celular del director no puede estar vacío');
        return false;
    } else if(!/^\d{9}$/.test(celularDirectorValue)) {
        alert('El número de celular debe tener 9 dígitos y contener solo números.');
        return false;
    }

    if(!emailDirectorValue) {
        alert('El campo para el e-mail del director no puede estar vacío.');
        return false;
    } else if (!/^[\w.-]+@[a-zA-Z.-]+\.[a-zA-Z]{2,}$/.test(emailDirectorValue)) {
        alert('El correo electrónico ingresado no es válido.');
        return false;
    }

    return true;
}

const validarExcelEstudiantes = (inputExcelValue) => {
    if(!inputExcelValue) {
        alert('Debe subir un archivo Excel con los datos de los estudiantes.');
        return false;
    }
    return true;
}

//Función con Evento 'change'
const validarExtensionExcel = () => {
    //El [0] es para acceder al único archivo que subirá el usuario -> Solo se puede subir un archivo
    const archivoExcel = inputExcel.files[0];

    if(archivoExcel && (archivoExcel.name.toLowerCase().endsWith('.xls') || archivoExcel.name.toLowerCase().endsWith('.xlsx'))) {
        //Procesar todo el EXCEL
        console.log('Archivo excel subido correctamente');
        console.log('Processar el archivo excel: ', archivoExcel.name, inputExcel.files);
    } else {
        alert('Debe subir un archivo Excel con los datos de los estudiantes.');
        
        inputExcel.value = ''; //Con esto se quitará el archivo incorrecto que ha sido ingresado
    }
}

export {validarDatosEscuela, validarDatosUbicacion, validarDatosDirector, validarExcelEstudiantes, validarExtensionExcel};