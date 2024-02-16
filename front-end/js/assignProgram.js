
const escuelaSelect = document.getElementById('escuela-select');// El AXIOS da, pero con la CDN, con el import no da :,v
const botonesRecurso = document.querySelectorAll('.boton-recurso');


const response = await axios.get('http://localhost:3000/assignProgram');
const schoolsData = response.data;

const schoolData = schoolsData.map(datosEscuela => {
    return [datosEscuela[0], datosEscuela[1]];
});

//Agregamos cada Escuela al SELECT -> Cada Escuela tendrá su Código Modular como "value"
for(const school of schoolData) {
    const nuevoOption = document.createElement('option');
    nuevoOption.innerText = `${school[1]}`;
    nuevoOption.value = school[0];
    escuelaSelect.append(nuevoOption);
}
/*************************************************************************** */
// LO QUE FALTARÍA SERIA QUE CUANDO EL USUARIO ESCOJA UNA ESCUELA, SE RECOJA SU CODIGO MODULAR 

//MEJOR TRAABJO DESDE LA MAIN, es MÁS RÁPIDO

const comportamientoBotonRecurso = (evento) => {
    evento.preventDefault();
}












const deshabilitarOpcion = () => {
    const opcionDisabled = document.getElementById('opcion-disabled');
    opcionDisabled.disabled = true;
}

escuelaSelect.addEventListener('click', deshabilitarOpcion);
botonesRecurso.forEach(botonRecurso => botonRecurso.addEventListener('click', comportamientoBotonRecurso))