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

const obtenerNombres = (lista) => {
    for(const objeto of lista) {
        const nombre = objeto["departamento"];
        console.log(nombre);
    }
}

const listaDepartamentos = await axiosGet('https://geo-peru-api.onrender.com/department');
const listaProvincias = await axiosGet('https://geo-peru-api.onrender.com/province');
const listaDistritos = await axiosGet('https://geo-peru-api.onrender.com/district');

console.log(listaDepartamentos);
obtenerNombres(listaDepartamentos);
console.log(listaProvincias);
console.log(listaDistritos);


