const departamentoSelect = document.getElementById('departamentoSelect');
const provinciaSelect = document.getElementById('provinciaSelect');
const distritoSelect = document.getElementById('distritoSelect');
const todosSelect = document.querySelectorAll('.select');

const axiosGet = async (url) => {
    try {
        const response = await axios.get(url);
        return response.data;
    } catch(err) {
        console.error('', err.message);
    }
}

const obtenerNombres = (lista, zonaGeografica) => {
    for(const objeto of lista) {
        const nombreDepartamento = objeto[zonaGeografica];
        const nuevoOption = document.createElement('option');
        nuevoOption.innerHTML = `${nombreDepartamento}`;
        departamentoSelect.append(nuevoOption);
    }
}

const deshabilitarOpcion = () => {
    const opcionDisabled = document.getElementById('opcion-disabled');
    opcionDisabled.disabled = true;
}

const listaDepartamentos = await axiosGet('https://geo-peru-api.onrender.com/department');
const listaProvincias = await axiosGet('https://geo-peru-api.onrender.com/province');
const listaDistritos = await axiosGet('https://geo-peru-api.onrender.com/district');

obtenerNombres(listaDepartamentos, 'departamento');

console.log(listaDepartamentos);
console.log(listaProvincias);
console.log(listaDistritos);


todosSelect.forEach(select => select.addEventListener('click', deshabilitarOpcion));
