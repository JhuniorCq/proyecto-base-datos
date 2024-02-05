
const escuelaSelect = document.getElementById('escuela-select');// El AXIOS da, pero con la CDN, con el import no da :,v

const response = await axios.get('http://localhost:3000/assignProgram');
const schoolsData = response.data;

const nombresEscuelas = schoolsData.map(datosEscuela => {
    return datosEscuela[1];
});

for(const escuela of nombresEscuelas) {
    const nuevoOption = document.createElement('option');
    nuevoOption.innerText = `${escuela}`;
    escuelaSelect.append(nuevoOption);
}

// LO QUE FALTARÍA SERIA QUE CUANDO EL USUARIO ESCOJA UNA ESCUELA, SE RECOJA SU CODIGO MODULAR 

//MEJOR TRAABJO DESDE LA MAIN, es MÁS RÁPIDO

const deshabilitarOpcion = () => {

    const opcionDisabled = document.getElementById('opcion-disabled');

    opcionDisabled.disabled = true;
}

escuelaSelect.addEventListener('click', deshabilitarOpcion);