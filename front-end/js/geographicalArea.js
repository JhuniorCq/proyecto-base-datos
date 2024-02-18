const departamentoSelect = document.getElementById('departamentoSelect');
const provinciaSelect = document.getElementById('provinciaSelect');
const distritoSelect = document.getElementById('distritoSelect');

const axiosGet = async (url) => {
    try {
        const response = await axios.get(url);
        return response.data;
    } catch(err) {
        console.error('', err.message);
    }
}

//Función sin Evento -> Mostrar Departamentos
const mostrarDepartamentos = () => {
    for(const objeto of listaDepartamentos) {
        const nombreDepartamento = objeto["departamento"];
        const idDepartamento = objeto["id_departamento"]
        crearOptionSelect(nombreDepartamento, idDepartamento, departamentoSelect);
    }
}

//Función con Evento 'change' -> Mostrar Provincias
const mostrarProvincias = () => {
    provinciaSelect.innerHTML = '';

    const contenidoOptionDefault = '-- Escoge una Provincia --';
    crearOptionDefault(contenidoOptionDefault, provinciaSelect);

    const idDepartamentoSeleccionado = departamentoSelect.value;
    // console.log('a', evento.target);
    // console.log(departamentoSelect);
    console.log(idDepartamentoSeleccionado);

    const provinciasSeleccionadas = listaProvincias.filter(provincia => provincia["id_departamento"] === idDepartamentoSeleccionado);
    console.log(provinciasSeleccionadas);
    
    for(const objeto of provinciasSeleccionadas) {
        const nombreProvincia = objeto["provincia"];
        const idProvincia = objeto["id_provincia"];
        crearOptionSelect(nombreProvincia, idProvincia, provinciaSelect);
    }
}

//Función con Evento 'change' -> Mostrar Distritos
const mostrarDistritos = () => {
    distritoSelect.innerHTML = '';

    const contenidoOptionDefault = '-- Escoge un Distrito --';
    crearOptionDefault(contenidoOptionDefault, distritoSelect);

    const idProvinciaSeleccionada = provinciaSelect.value;

    console.log(idProvinciaSeleccionada);

    const distritosSeleccionados = listaDistritos.filter(distrito => distrito["id_provincia"] === idProvinciaSeleccionada);

    console.log(distritosSeleccionados);

    for(const objeto of distritosSeleccionados) {
        const nombreDistrito = objeto["distrito"];
        const idDistrito = objeto["id_distrito"];
        crearOptionSelect(nombreDistrito, idDistrito, distritoSelect);
    }
}

const crearOptionSelect = (nombreZonaGeografica, idZonaGeografica, tipoSelect) => {
    const nuevoOption = document.createElement('option');
    nuevoOption.value = idZonaGeografica;
    nuevoOption.innerText = nombreZonaGeografica;
    tipoSelect.append(nuevoOption);
}

const crearOptionDefault = (contenidoOptionDefault, tipoSelect) => {
    const nuevoOption = document.createElement('option');
    nuevoOption.innerText = contenidoOptionDefault;
    nuevoOption.value = 'default';
    tipoSelect.append(nuevoOption);
}

//Función para Deshabilitar la opción "-- Escoge un Departamento --"
// const deshabilitarOpcion = () => {
//     const opcionDisabled = document.getElementById('opcion-disabled');
//     opcionDisabled.disabled = true;
// }

const listaDepartamentos = await axiosGet('https://geo-peru-api.onrender.com/department');
const listaProvincias = await axiosGet('https://geo-peru-api.onrender.com/province');
const listaDistritos = await axiosGet('https://geo-peru-api.onrender.com/district');

//AGREGAR DEPARTAMENTOS AL SELECT
mostrarDepartamentos();

//AGREGAR PROVINCIAS AL SELECT
departamentoSelect.addEventListener('change', mostrarProvincias);

//AGREGAR DISTRITOS AL SELECT
provinciaSelect.addEventListener('change', mostrarDistritos);

export {listaDepartamentos, listaProvincias, listaDistritos};