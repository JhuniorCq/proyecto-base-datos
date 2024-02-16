
const escuelaSelect = document.getElementById('escuela-select');// El AXIOS da, pero con la CDN, con el import no da :,v
const botonAgregarRecurso = document.getElementById('agregar-recurso');
const contenedorRecursos = document.querySelector('.contenedor-recursos');
let numeroRecurso = 0;

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

const agregarContenedorRecurso = () => {
    numeroRecurso++;
    const divContenedorRecurso = document.createElement('div');
    divContenedorRecurso.classList.add('contenedor-recurso');
    divContenedorRecurso.innerHTML = `
        <div class="contenedor-inputs">
            <div class="contenedor-input">
                <label for="nombre-recurso${numeroRecurso}">Nombre del recurso: </label>
                <input id="nombre-recurso${numeroRecurso}" type="text" name="nombre-recurso" class="input nombre-recurso" placeholder="Caja de Libros" required>
            </div>
            <div class="contenedor-input">
                <label for="descripcion-recurso${numeroRecurso}">Descripción del recurso: </label>
                <textarea id="descripcion-recurso${numeroRecurso}" cols="50" rows="4" class="input descripcion-recurso" placeholder="" required></textarea>
            </div>
            <div class="contenedor-input">
                <label for="cantidad-recurso${numeroRecurso}">Cantidad del recurso: </label>
                <input id="cantidad-recurso${numeroRecurso}" type="number" name="cantidad-recurso" class="input cantidad-recurso" placeholder="100" required>
            </div>
        </div>
        <div class="contenedor-boton-eliminar">
            <a href="#" class="boton-quitar"><i class="bi bi-x-square-fill" id="quitar-recurso${numeroRecurso}"></i></a>
        </div>
    `;
    contenedorRecursos.append(divContenedorRecurso);
    const hrSeparador = document.createElement('hr');
    hrSeparador.classList.add('separador');
    contenedorRecursos.append(hrSeparador);

    //Luego de crear a los <div> recién traigo a los botones, ya que estos están dentro de los <div> recién creados
    const botonQuitarRecurso = document.getElementById(`quitar-recurso${numeroRecurso}`);
    botonQuitarRecurso.addEventListener('click', quitarRecurso);
}

const quitarRecurso = (evento) => {
    evento.preventDefault();
    const botonQuitarSeleccionado = evento.target;
    const divContenedorRecurso = botonQuitarSeleccionado.parentElement.parentElement.parentElement;
    const hrSeparador = botonQuitarSeleccionado.parentElement.parentElement.parentElement.nextElementSibling;
    console.log(botonQuitarSeleccionado);
    console.log(botonQuitarSeleccionado.parentElement.parentElement.parentElement);
    console.log(botonQuitarSeleccionado.parentElement.parentElement.parentElement.nextElementSibling);

    // Eliminamos el <div> con class="contenedor-recurso" y asu <hr> hermano -> NO usamos el innerText en el <div> porque sino este seguiría existiendo
    divContenedorRecurso.remove();
    hrSeparador.remove();
}


const deshabilitarOpcion = () => {
    const opcionDisabled = document.getElementById('opcion-disabled');
    opcionDisabled.disabled = true;
}

escuelaSelect.addEventListener('click', deshabilitarOpcion);
botonAgregarRecurso.addEventListener('click', agregarContenedorRecurso);