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

const obtenerNombres = (lista, zonaGeografica) => {
    for(const objeto of lista) {
        const nombreDepartamento = objeto[zonaGeografica];
        const nuevoOption = document.createElement('option');
        nuevoOption.innerHTML = `${nombreDepartamento}`;
        departamentoSelect.append(nuevoOption);
    }
}

const listaDepartamentos = await axiosGet('https://geo-peru-api.onrender.com/department');
const listaProvincias = await axiosGet('https://geo-peru-api.onrender.com/province');
const listaDistritos = await axiosGet('https://geo-peru-api.onrender.com/district');

console.log(listaDepartamentos);
obtenerNombres(listaDepartamentos, 'departamento');
console.log(listaProvincias);
console.log(listaDistritos);


