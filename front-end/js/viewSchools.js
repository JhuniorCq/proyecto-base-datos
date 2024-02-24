import {modificarEscuela} from './modifySchool.js';
// import {obtenerNombreZonaGeografica} from './enrollSchool.js';
import {listaDepartamentos, listaProvincias, listaDistritos} from './geographicalArea.js';

const tbodyEscuelas = document.getElementById('tbody-escuelas');
const fondoInfoEscuela = document.getElementById('fondo-modal1');
const contenedorInfoEscuela = document.getElementById('contenedor-modal1');
const btnCerrarInfoEscuela = document.getElementById('btn-cerrar1');

const tbodyEstudiantes = document.getElementById('tbody-estudiantes');
const fondoInfoEstudiantes = document.getElementById('fondo-modal2')
const contenedorInfoEstudiantes = document.getElementById('contenedor-modal2')
const btnCerrarInfoEstudiantes = document.getElementById('btn-cerrar2');

const fondoModificarEscuela = document.getElementById('fondo-modal3');
const contenedorModificarEscuela = document.getElementById('contenedor-modal3');
const btnCerrarModificarEscuela = document.getElementById('btn-cerrar3');

const formularioModificar = document.querySelector('.form-modificar');
const nuevoCodigoModular = document.getElementById('codigo-modular');
const nuevoNombreEscuela = document.getElementById('nombre-escuela');
const nuevaDireccion = document.getElementById('direccion');
const departamentoSelect = document.getElementById('departamentoSelect');
const provinciaSelect = document.getElementById('provinciaSelect');
const distritoSelect = document.getElementById('distritoSelect');
const nuevosNombresDirector = document.getElementById('nombres-director');
const nuevosApellidosDirector = document.getElementById('apellidos-director');
const nuevoCelularDirector = document.getElementById('celular');
const nuevoCorreoDirector = document.getElementById('email');
const nuevoExcelEstudiantes = document.getElementById('input-excel');

const mostrarDatosEscuelas = async () => {
    try {
        const url = 'http://localhost:3000/getSchools';
        const schoolsData = await axiosGet(url);

        console.log(schoolsData);
        let iterador = 0;

        schoolsData.forEach(school => {
            const codigoModular = school[0];
            const nombreColegio = school[1];

            const filaEscuela = document.createElement('tr');
            filaEscuela.innerHTML = `
                <td>${codigoModular}</td>
                <td>${nombreColegio}</td>
                <td>
                    <button class="btn-ver-todo opcion" id="btn-ver-todo${iterador}" value="${codigoModular}">Ver escuela</button>
                    <button class="btn-ver-estudiantes opcion" id="btn-ver-estudiantes${iterador}" value="${codigoModular}">Ver estudiantes</button>
                    <i class="bi bi-pencil-square btn-modificar opcion" id="btn-modificar${iterador}" data-value="${codigoModular}"></i>
                    <i class="bi bi-x-square-fill btn-eliminar opcion" id="btn-eliminar${iterador}" data-value="${codigoModular}"></i>
                </td>
            `;
            tbodyEscuelas.append(filaEscuela);

            const btnVerTodo = document.getElementById(`btn-ver-todo${iterador}`);
            const btnVerEstudiantes = document.getElementById(`btn-ver-estudiantes${iterador}`);
            const btnModificar = document.getElementById(`btn-modificar${iterador}`);
            const btnEliminar = document.getElementById(`btn-eliminar${iterador}`);
            btnVerTodo.addEventListener('click', verInfoEscuela);
            btnVerEstudiantes.addEventListener('click', verInfoEstudiantes);
            btnModificar.addEventListener('click', modificarDatosEscuela);
            btnEliminar.addEventListener('click', eliminarEscuela);

            iterador++;
        });

    } catch(err) {
        console.error('Error al mostrar los datos de las escuelas.', err.message);
    }
}

const verInfoEscuela = async (evento) => {
    console.log('Esta es la info de una escuela');
    console.log(evento.target);

    const botonSeleccionado = evento.target;
    const tbodyEscuela = document.getElementById('tbody-escuela');
    const codigoModular = botonSeleccionado.value;
    const url = `http://localhost:3000/getSchool/${codigoModular}`;
    const responseEscuela = await axiosGet(url);
    const datosEscuela = responseEscuela[0];
    tbodyEscuela.innerHTML = `
        <tr>
            <td>Código modular</td>
            <td>${datosEscuela[0]}</td>
        </tr>
        <tr>
            <td>Nombre de la escuela</td>
            <td>${datosEscuela[1]}</td>
        </tr>
        <tr>
            <td>Dirección</td>
            <td>${datosEscuela[6]}</td>
        </tr>
        <tr>
            <td>Departamento</td>
            <td>${datosEscuela[9]}</td>
        </tr>
        <tr>
            <td>Provincia</td>
            <td>${datosEscuela[8]}</td>
        </tr>
        <tr>
            <td>Distrito</td>
            <td>${datosEscuela[7]}</td>
        </tr>
        <tr>
            <td>Nombre del director</td>
            <td>${datosEscuela[2]}</td>
        </tr>
        <tr>
            <td>Apellidos del director</td>
            <td>${datosEscuela[3]}</td>
        </tr>
        <tr>
            <td>Número del director</td>
            <td>${datosEscuela[4]}</td>
        </tr>
        <tr>
            <td>E-mail del director</td>
            <td>${datosEscuela[5]}</td>
        </tr>
    `;

    //Hacemos visible la Ventana Emergente con los datos de la escuela seleccionada
    fondoInfoEscuela.style.visibility = 'visible';
    contenedorInfoEscuela.classList.toggle('cerrar-contenedor-modal');
}

const cerrarInfoEscuela = () => {
    cerrarVentanaEmergente(contenedorInfoEscuela, fondoInfoEscuela);
}

const verInfoEstudiantes = async (evento) => {
    console.log('Esta es la info de los estudiantes');
    console.log(evento.target);
    const botonSeleccionado = evento.target;
    // const tbodyEstudiantes = document.getElementById('tbody-estudiantes');
    const codigoModular = botonSeleccionado.value;
    const url = `http://localhost:3000/getStudents/${codigoModular}`;
    const arrayEstudiantes = await axiosGet(url);

    console.log(arrayEstudiantes) //HASTA ACÁ YA RECOPILO LOS DATOS DEL ESTUDIANTE SELECCIONADO. FALTARIA MOSTRARLOS

    tbodyEstudiantes.innerText = '';

    //PARA MOSTRAR TODOS LOS DATOS DE LOS ESTUDIANTES DE UNA ESCUELA -> SE USARÁ EL FOREACH
    arrayEstudiantes.forEach(estudiante => {
        const fechaNacimiento = estudiante[3].split('T')[0];
        const nuevaFila = document.createElement('tr');
        nuevaFila.innerHTML = `
            <td>${estudiante[0]}</td>
            <td>${estudiante[1]}</td>
            <td>${estudiante[2]}</td>
            <td>${fechaNacimiento}</td>
            <td>${estudiante[4]}</td>
            <td>${estudiante[5]}</td>
        `;
        tbodyEstudiantes.append(nuevaFila);
    });
    //Hacemos visible la Ventana Emergente con los datos de los estudiantes de la escuela seleccionada
    fondoInfoEstudiantes.style.visibility = 'visible';
    contenedorInfoEstudiantes.classList.toggle('cerrar-contenedor-modal');
}   

const cerrarInfoEstudiantes = () => {
    cerrarVentanaEmergente(contenedorInfoEstudiantes, fondoInfoEstudiantes);
}

const modificarDatosEscuela = (evento) => {
    console.log('Estás modificando los datos de una escuela');
    console.log(evento.target);
    const botonSeleccionado = evento.target;
    const codigoModular = botonSeleccionado.dataset.value;
    console.log(codigoModular);

    //LÓGICA PARA ENVIAR LOS DATOS Y ESO
    

    

    //Hacemos visible la ventana emergente para modificar una escuela
    fondoModificarEscuela.style.visibility = 'visible';
    contenedorModificarEscuela.classList.toggle('cerrar-contenedor-modal');

}

const cerrarModificarEscuela = () => {
    cerrarVentanaEmergente(contenedorModificarEscuela, fondoModificarEscuela);
}

const cerrarVentanaEmergente = (contenedor, fondo) => {
    contenedor.classList.toggle('cerrar-contenedor-modal');
    //Este setTimeout es para que se aprecie la Transición y no se cierre la ventana de frente
    setTimeout(function() {
        fondo.style.visibility = 'hidden';
    }, 600);
}

const eliminarEscuela = (evento) => {
    console.log('Estás eliminando una escuela');
    console.log(evento.target);
}

const axiosGet = async (url) => {
    const response = await axios.get(url);
    return response.data;
}

mostrarDatosEscuelas();

btnCerrarInfoEscuela.addEventListener('click', cerrarInfoEscuela);
btnCerrarInfoEstudiantes.addEventListener('click', cerrarInfoEstudiantes);
btnCerrarModificarEscuela.addEventListener('click', cerrarModificarEscuela);
formularioModificar.addEventListener('submit', modificarEscuela);

//Este evento es para que cuando se de click en el Fondo Oscuro, cuando aparece la Ventana Emergente, hará que la Ventana Emergente se vaya
window.addEventListener('click', function(evento) {
    if(evento.target === fondoInfoEscuela) {
        cerrarVentanaEmergente(contenedorInfoEscuela, fondoInfoEscuela);
    } else if(evento.target === fondoInfoEstudiantes) {
        cerrarVentanaEmergente(contenedorInfoEstudiantes, fondoInfoEstudiantes);
    } else if(evento.target === fondoModificarEscuela) {
        cerrarVentanaEmergente(contenedorModificarEscuela, fondoModificarEscuela);
    }
});

export {
    nuevoCodigoModular,
    nuevoNombreEscuela,
    nuevaDireccion,
    departamentoSelect,
    provinciaSelect,
    distritoSelect,
    nuevosNombresDirector,
    nuevosApellidosDirector,
    nuevoCelularDirector,
    nuevoCorreoDirector,
    nuevoExcelEstudiantes
};