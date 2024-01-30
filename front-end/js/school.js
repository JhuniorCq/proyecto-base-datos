
const escuelaSelect = document.getElementById('escuela-select');// El AXIOS da, pero con la CDN, con el import no da :,v

console.log('Se lee este archivo :,v');


const response = await axios.get('http://localhost:3000/assignProgram');
const schoolsData = response.data;

console.log(schoolsData);

const nombresEscuelas = schoolsData.map(datosEscuela => {
    return datosEscuela[1];
});

console.log(nombresEscuelas);

const cantidadEscuelas = nombresEscuelas.length;

for(const escuela of nombresEscuelas) {
    const nuevoOption = document.createElement('option');
    nuevoOption.innerText = `${escuela}`;
    escuelaSelect.append(nuevoOption);
}

// LO QUE FALTARÍA SERIA QUE CUANDO EL USUARIO ESCOJA UNA ESCUELA, SE RECOJA SU CODIGO MODULAR 


const deshabilitarOpcion = async () => {

    const opcionDisabled = document.getElementById('opcion-disabled');

    opcionDisabled.disabled = true;
}

escuelaSelect.addEventListener('click', deshabilitarOpcion);