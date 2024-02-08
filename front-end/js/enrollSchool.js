const departamentoSelect = document.getElementById('departamentoSelect');
const provinciaSelect = document.getElementById('provinciaSelect');
const distritoSelect = document.getElementById('distritoSelect');
const todosSelect = document.querySelectorAll('.select');

console.log(todosSelect);

const axiosGet = async (url) => {
    try {
        const response = await axios.get(url);
        return response.data;
    } catch(err) {
        console.error('', err.message);
    }
}

const mostrarDepartamentos = (lista, zonaGeografica) => {
    for(const objeto of lista) {
        const nombreDepartamento = objeto[zonaGeografica];
        crearOptionSelect(nombreDepartamento);
    }
}

const crearOptionSelect = (nombreDepartamento) => {
    const nuevoOption = document.createElement('option');
    nuevoOption.innerHTML = `${nombreDepartamento}`;
    departamentoSelect.append(nuevoOption);
}

//Función para Deshabilitar la opción "-- Escoge un Departamento --"
const deshabilitarOpcion = () => {
    const opcionDisabled = document.getElementById('opcion-disabled');
    opcionDisabled.disabled = true;
}

const funcion = () => {
    console.log(departamentoSelect.value);
}

const listaDepartamentos = await axiosGet('https://geo-peru-api.onrender.com/department');
const listaProvincias = await axiosGet('https://geo-peru-api.onrender.com/province');
const listaDistritos = await axiosGet('https://geo-peru-api.onrender.com/district');

//AGREGAR DEPARTAMENTOS AL SELECT
mostrarDepartamentos(listaDepartamentos, 'departamento');

//AGREGAR PROVINCIAS AL SELECT

//AGREGAR DISTRITOS AL SELECT


console.log(listaDepartamentos);
console.log(listaProvincias);
console.log(listaDistritos);


departamentoSelect.addEventListener('change', funcion);

//Deshabilitar opción por defecto de los 3 Select
todosSelect.forEach(select => select.addEventListener('click', deshabilitarOpcion));
