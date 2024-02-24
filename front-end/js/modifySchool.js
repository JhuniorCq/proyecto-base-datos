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

const modificarEscuela = (evento) => {
    evento.preventDefault();
    
    const codigoModularValor = nuevoCodigoModular.value;
    const nombreEscuela = nuevoNombreEscuela.value;
    const direccionEscuela = nuevaDireccion.value;
    const departamentoEscuela = obtenerNombreZonaGeografica(departamentoSelect.value, listaDepartamentos, 'id_departamento', 'departamento');
    const provinciaEscuela = obtenerNombreZonaGeografica(provinciaSelect.value, listaProvincias, 'id_provincia', 'provincia');
    const distritoEscuela = obtenerNombreZonaGeografica(distritoSelect.value, listaDistritos, 'id_distrito', 'distrito');
    const nombresDirector = nuevosNombresDirector.value;
    // const

    //SI NO SE AGREGA NADA EN LOS INPUTS SE RECOGE UNA CADENA VACÍA
    console.log(nuevoExcelEstudiantes.value === '');

    
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