const tbodyProgramas = document.getElementById('tbody-programas');
const fondoInfoPrograma = document.getElementById('fondo-modal1');
const contenedorInfoPrograma = document.getElementById('contenedor-modal1');
const btnCerrarInfoPrograma = document.getElementById('btn-cerrar1');

const tbodyRecursos = document.getElementById('tbody-recursos');
const fondoInfoRecursos = document.getElementById('fondo-modal2');
const contenedorInfoRecursos = document.getElementById('contenedor-modal2');
const btnCerrarInfoRecursos = document.getElementById('btn-cerrar2');

const fondoModificarPrograma = document.getElementById('fondo-modal3');
const contenedorModificarPrograma = document.getElementById('contenedor-modal3');
const btnCerrarModificarPrograma = document.getElementById('btn-cerrar3');

const mostrarDatosProgramas = async () => {
    try {
        const url = 'http://localhost:3000/getPrograms';
        const response = await axios.get(url);
        const programsData = response.data;

        console.log('programsData', programsData);
        let iterador = 0;

        for(const program of programsData) {
            const idPrograma = program[0];
            const nombrePrograma = program[1];
            const codigoModular = program[5];
            // console.log(codigoModular)
            const nombreEscuela = await obtenerNombreEscuela(codigoModular);
            
            const filaPrograma = document.createElement('tr');
            filaPrograma.innerHTML = `
                <td>${idPrograma}</td>
                <td>${nombrePrograma}</td>
                <td>${nombreEscuela}</td>
                <td>
                    <button class="btn-ver-programa opcion" id="btn-ver-programa${iterador}" value="${idPrograma}">Ver programa</button>
                    <button class="btn-ver-recursos opcion" id="btn-ver-recursos${iterador}" value="${idPrograma}">Ver recursos</button>
                    <i class="bi bi-pencil-square btn-modificar opcion" id="btn-modificar${iterador}" data-value="${idPrograma}"></i>
                    <i class="bi bi-x-square-fill btn-eliminar opcion" id="btn-eliminar${iterador}" data-value="${idPrograma}"></i>
                </td>
            `;

            tbodyProgramas.append(filaPrograma);

            const btnVerPrograma = document.getElementById(`btn-ver-programa${iterador}`);
            const btnVerRecursos = document.getElementById(`btn-ver-recursos${iterador}`);
            const btnModificar = document.getElementById(`btn-modificar${iterador}`);
            const btnEliminar = document.getElementById(`btn-eliminar${iterador}`);
            btnVerPrograma.addEventListener('click', verInfoPrograma);
            btnVerRecursos.addEventListener('click', verInfoRecursos);
            btnModificar.addEventListener('click', modificarDatosPrograma);
            btnEliminar.addEventListener('click', eliminarPrograma);

            iterador++;
        }
    } catch(err) {
        console.error('Error en mostrarDatosProgramas en viewPrograms.js', err.message)
    }
}

const verInfoPrograma = async (evento) => {
    console.log(evento.target)

    const botonSeleccionado = evento.target;
    const tbodyPrograma = document.getElementById('tbody-programa');
    const idPrograma = botonSeleccionado.value;
    console.log(idPrograma)
    
    const url = `http://localhost:3000/getProgram/${idPrograma}`;
    const responsePrograma = await axios.get(url);
    const datosPrograma = responsePrograma.data[0];

    const nombreEscuela = await obtenerNombreEscuela(datosPrograma[5]);
    const fechaInicio = datosPrograma[6].split('T')[0];
    const fechaFin = datosPrograma[7].split('T')[0];
    tbodyPrograma.innerHTML = `
        <tr>
            <td>N° Programa</td>
            <td>${datosPrograma[0]}</td>
        </tr>
        <tr>
            <td>Nombre</td>
            <td>${datosPrograma[1]}</td>
        </tr>
        <tr>
            <td>Descripción</td>
            <td>${datosPrograma[2]}</td>
        </tr>
        <tr>
            <td>Objetivo</td>
            <td>${datosPrograma[3]}</td>
        </tr>
        <tr>
            <td>Presupuesto</td>
            <td>${datosPrograma[4]}</td>
        </tr>
        <tr>
            <td>Fecha Inicio</td>
            <td>${fechaInicio}</td>
        </tr>
        <tr>
            <td>Fecha Fin</td>
            <td>${fechaFin}</td>
        </tr>
        <tr>
            <td>Escuela Asignada</td>
            <td>${nombreEscuela}</td>
        </tr>
        <tr>
            <td>Código Modular</td>
            <td>${datosPrograma[5]}</td>
        </tr>
    `;
    //Hacemos visible la Ventana Emergente con los datos del programa seleccionado
    fondoInfoPrograma.style.visibility = 'visible';
    contenedorInfoPrograma.classList.toggle('cerrar-contenedor-modal');
}

const cerrarInfoPrograma = () => {
    cerrarVentanaEmergente(contenedorInfoPrograma, fondoInfoPrograma);
}

const verInfoRecursos = async (evento) => {
    console.log(evento.target)
    const botonSeleccionado = evento.target;
    // const tbodyRecursos = document.getElementById('tbody-recursos');
    const idPrograma = botonSeleccionado.value;
    console.log(idPrograma);
    const urlRecursos = `http://localhost:3000/getResources/${idPrograma}`;
    const response = await axios.get(urlRecursos);
    const arrayRecursos = response.data;

    console.log(arrayRecursos);
    //CON ESTO OBTENGO LOS DATOS DEL PROGRAMA -> USARÉ SOLO EL NOMBRE datosPrograma[1]
    const urlPrograma = `http://localhost:3000/getProgram/${idPrograma}`;
    const responsePrograma = await axios.get(urlPrograma);
    const datosPrograma = responsePrograma.data[0];

    //CON ESTO VACÍO AL <div> ANTES DE COLOCARLE LOS RECURSOS DEL PROGRAMA ESCOGIDO
    tbodyRecursos.innerText = '';
    arrayRecursos.forEach(recurso => {
        const nuevaFila = document.createElement('tr');
        nuevaFila.innerHTML = `
            <td>${datosPrograma[1]}</td>
            <td>${recurso[0]}</td>
            <td>${recurso[1]}</td>
            <td>${recurso[2]}</td>
        `;
        tbodyRecursos.append(nuevaFila);
    });
    // Hacemos visible la ventana emergente con los datos de los recursos del programa seleccionado
    fondoInfoRecursos.style.visibility = 'visible';
    contenedorInfoRecursos.classList.toggle('cerrar-contenedor-modal');
}

const cerrarInfoRecursos = () => {
    cerrarVentanaEmergente(contenedorInfoRecursos, fondoInfoRecursos);
}

const modificarDatosPrograma = (evento) => {
    console.log(evento.target)
    const botonSeleccionado = evento.target;
    const idPrograma = botonSeleccionado.dataset.value;
    console.log(idPrograma)

    //LÓGICA PARA ENVIAR LOS DATOS Y ESO

    //Hacemos visible la ventana emergente para modificar una escuela
    fondoModificarPrograma.style.visibility = 'visible';
    contenedorModificarPrograma.classList.toggle('cerrar-contenedor-modal');
}

const cerrarModificarPrograma = () => {
    cerrarVentanaEmergente(contenedorModificarPrograma, fondoModificarPrograma);
}

const cerrarVentanaEmergente = (contenedor, fondo) => {
    contenedor.classList.toggle('cerrar-contenedor-modal');
    //Este setTimeout es para que se aprecie la Transición y no se cierre la ventana de frente
    setTimeout(function() {
        fondo.style.visibility = 'hidden';
    }, 600);
}

const eliminarPrograma = (evento) => {
    console.log(evento.target)
}

const obtenerNombreEscuela = async (codigoModular) => {
    const url = `http://localhost:3000/getSchool/${codigoModular}`;
    const response = await axios.get(url);
    const datosEscuela = response.data[0];
    const nombreEscuela = datosEscuela[1];
    console.log(datosEscuela)
    return nombreEscuela;
}

mostrarDatosProgramas();

btnCerrarInfoPrograma.addEventListener('click', cerrarInfoPrograma);
btnCerrarInfoRecursos.addEventListener('click', cerrarInfoRecursos);
btnCerrarModificarPrograma.addEventListener('click', cerrarModificarPrograma)

window.addEventListener('click', function(evento) {
    if(evento.target === fondoInfoPrograma) {
        cerrarVentanaEmergente(contenedorInfoPrograma, fondoInfoPrograma);
    } else if(evento.target === fondoInfoRecursos) {
        cerrarVentanaEmergente(contenedorInfoRecursos, fondoInfoRecursos);
    } else if(evento.target === fondoModificarPrograma) {
        cerrarVentanaEmergente(contenedorModificarPrograma, fondoModificarPrograma);
    }
})
