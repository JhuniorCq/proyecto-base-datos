import {
    nuevoCodigoModular,
    nuevoNombreEscuela,
    nuevaDireccion,
    departamentoSelect,
    provinciaSelect,
    distritoSelect,
    nuevosNombresDirector,
    nuevosApellidosDirector,
    nuevoCelularDirector,
    nuevoCorreoDirector,
    nuevoExcelEstudiantes
} from './viewSchools.js';

import {listaDepartamentos, listaProvincias, listaDistritos} from './geographicalArea.js';

const modificarEscuela = async (evento) => {
    try {
        evento.preventDefault();
        
        const codigoModularValor = nuevoCodigoModular.value;
        const nombreEscuela = nuevoNombreEscuela.value;
        const direccionEscuela = nuevaDireccion.value;
        const departamentoEscuela = obtenerNombreZonaGeografica(departamentoSelect.value, listaDepartamentos, 'id_departamento', 'departamento');
        const provinciaEscuela = obtenerNombreZonaGeografica(provinciaSelect.value, listaProvincias, 'id_provincia', 'provincia');
        const distritoEscuela = obtenerNombreZonaGeografica(distritoSelect.value, listaDistritos, 'id_distrito', 'distrito');
        const nombresDirector = nuevosNombresDirector.value;
        const apellidosDirector = nuevosApellidosDirector.value;
        const celularDirector = nuevoCelularDirector.value;
        const correoDirector = nuevoCorreoDirector.value;
        // const excelEstudiantes = nuevoExcelEstudiantes.value;

        const formData = new FormData();
        // codigoModularValor === '' ? true: false;
        
        formData.append('modular_code', codigoModularValor);
        formData.append('name_school', nombreEscuela);
        formData.append('address', direccionEscuela);
        formData.append('district_name', departamentoEscuela);
        formData.append('province_name', provinciaEscuela);
        formData.append('department_name', distritoEscuela);
        formData.append('director_name', nombresDirector);
        formData.append('director_lastname', apellidosDirector);
        formData.append('director_cellphone', celularDirector);
        formData.append('director_email', correoDirector);
        formData.append('excelStudents', nuevoExcelEstudiantes.files[0]);

        const url = 'http://localhost:3000/modifySchool';
            
        
        const response = await axios.put(url, formData);
        const respuesta = response.data;

        alert(respuesta);

    } catch(err) {
        console.error('Error en modificarEscuela en modifySchool.js', err.message);
        alert('Error al modificar los datos.');
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

export {modificarEscuela};