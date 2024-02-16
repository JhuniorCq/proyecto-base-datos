
import {validarDatosEscuela, validarDatosDirector, validarDatosUbicacion, validarExcelEstudiantes, validarExtensionExcel} from './validations.js';
import {listaDepartamentos, listaProvincias, listaDistritos} from './geographicalArea.js';

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
    const nombreDepartamento = obtenerNombreZonaGeografica(departamentoSelectValue, listaDepartamentos, 'id_departamento', 'departamento');
    const nombreProvincia = obtenerNombreZonaGeografica(provinciaSelectValue, listaProvincias, 'id_provincia', 'provincia');
    const nombreDistrito = obtenerNombreZonaGeografica(distritoSelectValue, listaDistritos, 'id_distrito', 'distrito');

    console.log(departamentoSelectValue, provinciaSelectValue, distritoSelectValue)
    console.log(nombreDepartamento, nombreProvincia, nombreDistrito);

    //Ejecución y comprobación de las 3 funciones de validación
    if(validarDatosEscuela(codigoModularValue, nombreEscuelaValue, direccionEscuelaValue) && 
        validarDatosUbicacion(departamentoSelectValue, provinciaSelectValue, distritoSelectValue) && 
        validarDatosDirector(nombresDirectorValue, apellidosDirectorValue, celularDirectorValue, emailDirectorValue) && 
        validarExcelEstudiantes(inputExcelValue)) {

        //VAMO A ENVIAR TODOS LOS DATOS AL SERVIDOR YA :3
        const formData = new FormData();
        formData.append('modular_code', codigoModular.value);
        formData.append('name_school', nombreEscuela.value);
        formData.append('address', direccionEscuela.value);
        formData.append('district_name', nombreDistrito);
        formData.append('province_name', nombreProvincia);
        formData.append('department_name', nombreDepartamento);
        formData.append('director_name', nombresDirector.value);
        formData.append('director_lastname', apellidosDirector.value);
        formData.append('director_cellphone', celularDirector.value);
        formData.append('director_email', emailDirector.value);
        formData.append('excelStudents', inputExcel.files[0]); // Accede al archivo seleccionado por el usuario
        
        console.log(codigoModularValue, codigoModular.value)
        console.log('formData', formData)
        const url = 'http://localhost:3000/enrollSchool';
        
        setTimeout(null, 1000);

        //AHORA EL PROBLEMA QUE PUEDE APARECER ES QUE NO APAREZCAN LOS ALERTS DEBIDO AL ASINCRONISMO, PERO LO DEJARÉ ASÍ
        try {
            const response = await axiosPost(url, formData);
            console.log('Datos registrados exitosamente :D', response.data);
            alert('Datos registrados exitosamente.', response.data);

        } catch(err) {
            // Si ocurre un error, muestras un mensaje de error al usuario
            console.error('Error al enviarrrr', err);
            alert(`Ocurrió un error al enviar los datos.\n\t- Asegúrese de que el colegio o alguno de sus estudiantes no esté registrado en la base de datos.`);
        }
        
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
        return response;
    } catch(err) {
        throw err;
    }
}

const obtenerNombreZonaGeografica = (zonaGeograficaValue, listaZonaGeografica, clave_id, clave_nombre) => {
    let nombreZonaGeografica;

    for(const zonaGeografica of listaZonaGeografica) {
        if(zonaGeografica[clave_id] === zonaGeograficaValue) {
            nombreZonaGeografica = zonaGeografica[clave_nombre];
            break;
        }
    }
    return nombreZonaGeografica;
}

formulario.addEventListener('submit', enrollSchool);
inputExcel.addEventListener('change', validarExtensionExcel);

export {inputExcel};