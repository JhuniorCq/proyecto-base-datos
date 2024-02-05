

const response1 = await axios.get('https://geo-peru-api.onrender.com/department');
const listaDepartamentos = response1.data;

const response2 = await axios.get('https://geo-peru-api.onrender.com/province')
const listaProvincias = response2.data;

const response3 = await axios.get('https://geo-peru-api.onrender.com/district');
const listaDistritos = response3.data;

console.log(listaDepartamentos);
console.log(listaProvincias);
console.log(listaDistritos);


// const consumirGeoPeruAPI = async () => {
//     try {
//         const response = await axios.get('');
//     } catch (err) {
//         console.error('', err.message)
//     }
// }