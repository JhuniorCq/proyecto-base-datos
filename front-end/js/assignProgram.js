
const escuelaSelect = document.getElementById('escuela-select');// El AXIOS da, pero con la CDN, con el import no da :,v
const botonAgregarRecurso = document.getElementById('agregar-recurso');
const contenedorRecursos = document.querySelector('.contenedor-recursos');
const formulario = document.querySelector('.formulario');
const nombrePrograma = document.getElementById('nombre-programa');
const descripcionPrograma = document.getElementById('descripcion-programa');
const objetivoPrograma = document.getElementById('objetivo-programa');
const presupuestoPrograma = document.getElementById('presupuesto-programa');
const fechaInicio = document.getElementById('fecha-inicio');
const fechaFin = document.getElementById('fecha-fin');


let numeroRecurso = 0;

// Basta con ponerle el async a la Función para que esta espere la respuesta del BACK en vez de terminar su ejecución de frente
const asignarPrograma = async (evento) => {
    try {
        evento.preventDefault();
        const arrayNombresRecursos = document.querySelectorAll('.nombre-recurso');
        const arrayDescripcionRecursos = document.querySelectorAll('.descripcion-recurso');
        const arrayCantidadRecursos = document.querySelectorAll('.cantidad-recurso');
        // La cantidad de Nombres de Recursos definirá el # de iteraciones porque los 3 Campos serán obligatorios
        let cantidadIteraciones = arrayNombresRecursos.length;

        //Cada Recurso con su nombre, descripción y cantidad representará a un Objeto y será almacenado en este Array
        const arrayDatosRecursos = [];

        for(let i=0; i<cantidadIteraciones; i++) {
            const datosRecursos = {};
            datosRecursos['nombre-recurso'] = arrayNombresRecursos[i].value;
            datosRecursos['descripcion-recurso'] = arrayDescripcionRecursos[i].value;
            datosRecursos['cantidad-recurso'] = arrayCantidadRecursos[i].value;
            arrayDatosRecursos.push(datosRecursos);
        }

        const escuelaSelectValue = escuelaSelect.value;
        const nombreProgramaValue = nombrePrograma.value;
        const descripcionProgramaValue = descripcionPrograma.value;
        const objetivoProgramaValue = objetivoPrograma.value;
        const presupuestoProgramaValue = presupuestoPrograma.value;
        const fechaInicioValue = fechaInicio.value;
        const fechaFinValue = fechaFin.value;
        const fechaInicioFormateada = fechaInicioValue.split('-').reverse().join('/');

        const fechaFinFormateada = fechaFinValue.split('-').reverse().join('/');

        console.log(escuelaSelectValue, nombreProgramaValue, descripcionProgramaValue, objetivoProgramaValue, presupuestoProgramaValue, fechaInicioValue, fechaFinValue);

        console.log('arrayDatosRecursos', arrayDatosRecursos);
        
        const datosPrograma = {
            modular_code: escuelaSelectValue,
            program_name: nombreProgramaValue,
            program_description: descripcionProgramaValue,
            objective: objetivoProgramaValue,
            budget: presupuestoProgramaValue,
            start_date: fechaInicioFormateada,
            end_date: fechaFinFormateada,
            array_recursos: arrayDatosRecursos
        }

        const url = 'http://localhost:3000/assignProgram';
        const response = await axios.post(url, datosPrograma);
        const respuestaInsertarPrograma = response.data;

        if(respuestaInsertarPrograma === 'Error') {
            alert('Debe ingresar como mínimo 1 recurso.');
            return;
        }

    } catch(err) {
        console.error('Error en asignarPrograma en assignProgram.js', err.message);
        alert('Ha ocurrido un error al asignar un programa');
    }
}

const mostrarDatosEscuelas = async () => {
    try {
        const response = await axios.get('http://localhost:3000/getSchools');
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
    } catch(err) {
        console.error('Error al mostrar los nombres de las escuelas.', err.message);
    }
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

mostrarDatosEscuelas();

escuelaSelect.addEventListener('click', deshabilitarOpcion);
botonAgregarRecurso.addEventListener('click', agregarContenedorRecurso);
formulario.addEventListener('submit', asignarPrograma);