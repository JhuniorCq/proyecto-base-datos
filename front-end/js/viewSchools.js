const tbodyEscuelas = document.getElementById('tbody-escuelas');
const fondoInfoEscuela = document.querySelector('.fondo-info-escuela');
const contenedorInfoEscuela = document.querySelector('.contenedor-info-escuela');
const btnCerrarInfoEscuela = document.getElementById('btn-cerrar');

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
                <td scope="row">${codigoModular}</td>
                <td>${nombreColegio}</td>
                <td>
                    <button class="btn-ver-todo opcion" id="btn-ver-todo${iterador}">Ver todo</button>
                    <button class="btn-ver-estudiantes opcion" id="btn-ver-estudiantes${iterador}">Ver estudiantes</button>
                    <i class="bi bi-pencil-square btn-modificar opcion" id="btn-modificar${iterador}"></i>
                    <i class="bi bi-x-square-fill btn-eliminar opcion" id="btn-eliminar${iterador}"></i>
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

const verInfoEscuela = (evento) => {
    console.log('Esta es la info de una escuela');
    console.log(evento.target);

    //Hacemos visible la Ventana Emergeete con los datos de la escuela seleccionada
    fondoInfoEscuela.style.visibility = 'visible';
    contenedorInfoEscuela.classList.toggle('cerrar-contenedor-info-escuela');
}

const cerrarInfoEscuela = () => {
    contenedorInfoEscuela.classList.toggle('cerrar-contenedor-info-escuela');
    setTimeout(function() {
        fondoInfoEscuela.style.visibility = 'hidden';
    }, 600);
}

const verInfoEstudiantes = (evento) => {
    console.log('Esta es la info de los estudiantes');
    console.log(evento.target);
}

const modificarDatosEscuela = (evento) => {
    console.log('Estás modificando los datos de una escuela');
    console.log(evento.target);
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
window.addEventListener('click', function(evento) {
    if(evento.target === fondoInfoEscuela) {
        contenedorInfoEscuela.classList.toggle('cerrar-contenedor-info-escuela');
        setTimeout(function() {
            fondoInfoEscuela.style.visibility = 'hidden';
        }, 600);
    }
});