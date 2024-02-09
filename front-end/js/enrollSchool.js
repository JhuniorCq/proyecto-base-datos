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

        //AHORA CREARÉ UN OBJETO PARA ENVIAR AL BACKEND -> RECORDAR QUE LA TABLA SCHOOLS SE DIVIDIÓ EN MÁS TABLAS (director y Locations)
        //YO CREO QUE DIRECCIÓN DEBE ESTAR EN SCHOOL Y QUE DEPARTAMENTO, PROVINCIA Y DISTRITO EN UNA TABLA NUEVA Locations
        //O QUE DIRECCION, DEPARTAMENTO, PROVINCIA Y DISTRITO SEAN DE UNA TABLA APARTE -> Location
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
    } else if(nombresDirectorValue > 30) {
        alert('Como máximo se permite 30 caracteres para los nombres del director.');
        return false;
    }

    if(!apellidosDirectorValue) {
        alert('El campo para los apellidos del director no puede estar vacío');
        return false;
    } else if(apellidosDirectorValue > 30) {
        alert('Como máximo se permiten 30 caracteres para los apellidos del director.');
        return;
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
        console.log('Processar el archivo excel: ', archivoExcel.name);
    } else {
        alert('Debe subir un archivo Excel con los datos de los estudiantes.');
        
        inputExcel.value = ''; //Con esto se quitará el archivo incorrecto que ha sido ingresado
    }
}


formulario.addEventListener('submit', funcion);
inputExcel.addEventListener('change', validarExtensionExcel);