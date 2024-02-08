const formulario = document.querySelector('.formulario');
const codigoModular = document.getElementById('codigo-modular');
const nombreEscuela = document.getElementById('nombre-escuela');
const direccionEscuela = document.getElementById('direccion');
const departamentoSelect = document.getElementById('departamentoSelect');
const provinciaSelect = document.getElementById('provinciaSelect');
const distritoSelect = document.getElementById('distritoSelect');

const nombresDirector = document.getElementById('nombres-director');
const apellidosDirector = document.getElementById('apellidos-director');
const telefonoDirector = document.getElementById('telefono');
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
    const telefonoDirectorValue = telefonoDirector.value;
    const emailDirectorValue = emailDirector.value;

    //Ejecución y comprobación de las 3 funciones de validación
    if(validarDatosEscuela(codigoModularValue, nombreEscuelaValue, direccionEscuelaValue) && 
        validarDatosUbicacion(departamentoSelectValue, provinciaSelectValue, distritoSelectValue) && 
        validarDatosDirector(nombresDirectorValue, apellidosDirectorValue, telefonoDirectorValue, emailDirectorValue)) {
        console.log('Datos registrados exitosamente :D');
        alert('Datos registrados exitosamente.');
        // PUEDO DEJAR ESTE IF ASÍ, O HACER QUE ESTE SEA !validarDatosEscuela... y así, y el alert() iría fuera del ID
    } else {
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
    console.log(telefonoDirector.value);
    console.log(emailDirector.value);
}

const validarDatosEscuela = (codigoModularValue, nombreEscuelaValue, direccionEscuelaValue) => {
    if(!codigoModularValue || codigoModularValue.length != 7) {
        alert('Error al ingresar el código modular.');
        return false;
    }

    if(!nombreEscuelaValue || nombreEscuelaValue.length > 30){
        alert('Error al ingresar el nombre de la escuela.')
        return false;
    }

    //La dirección es un campo opcional
    if(direccionEscuelaValue.length > 50) {
        alert('Error al ingresar la dirección de la escuela.');
        return false;
    }

    return true;
}

const validarDatosUbicacion = (departamentoSelectValue, provinciaSelectValue, distritoSelectValue) => {


    return true;
}

const validarDatosDirector = (nombresDirectorValue, apellidosDirectorValue, telefonoDirectorValue, emailDirectorValue) => {


    return true;
}


formulario.addEventListener('submit', funcion);