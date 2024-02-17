const tbodyEscuelas = document.getElementById('tbody-escuelas');
const fondoInfoEscuela = document.getElementById('fondo-modal1');
const contenedorInfoEscuela = document.getElementById('contenedor-modal1');
const btnCerrarInfoEscuela = document.getElementById('btn-cerrar1');

const tbodyEstudiantes = document.getElementById('tbody-estudiantes');
const fondoInfoEstudiantes = document.getElementById('fondo-modal2')
const contenedorInfoEstudiantes = document.getElementById('contenedor-modal2')
const btnCerrarInfoEstudiantes = document.getElementById('btn-cerrar2');

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
                    <button class="btn-ver-todo opcion" id="btn-ver-todo${iterador}" value="${codigoModular}">Ver todo</button>
                    <button class="btn-ver-estudiantes opcion" id="btn-ver-estudiantes${iterador}" value="${codigoModular}">Ver estudiantes</button>
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
            <td scope="row">Código modular</td>
            <td>${datosEscuela[0]}</td>
        </tr>
        <tr>
            <td scope="row">Nombre de la escuela</td>
            <td>${datosEscuela[1]}</td>
        </tr>
        <tr>
            <td scope="row">Dirección</td>
            <td>${datosEscuela[6]}</td>
        </tr>
        <tr>
            <td scope="row">Departamento</td>
            <td>${datosEscuela[9]}</td>
        </tr>
        <tr>
            <td scope="row">Provincia</td>
            <td>${datosEscuela[8]}</td>
        </tr>
        <tr>
            <td scope="row">Distrito</td>
            <td>${datosEscuela[7]}</td>
        </tr>
        <tr>
            <td scope="row">Nombre del director</td>
            <td>${datosEscuela[2]}</td>
        </tr>
        <tr>
            <td scope="row">Apellidos del director</td>
            <td>${datosEscuela[3]}</td>
        </tr>
        <tr>
            <td scope="row">Número del director</td>
            <td>${datosEscuela[4]}</td>
        </tr>
        <tr>
            <td scope="row">E-mail del director</td>
            <td>${datosEscuela[5]}</td>
        </tr>
    `;

    //Hacemos visible la Ventana Emergeete con los datos de la escuela seleccionada
    fondoInfoEscuela.style.visibility = 'visible';
    contenedorInfoEscuela.classList.toggle('cerrar-contenedor-modal');
}

const cerrarInfoEscuela = () => {
    contenedorInfoEscuela.classList.toggle('cerrar-contenedor-modal');
    //Este setTimeout es para que se aprecie la Transición y no se cierre la ventana de frente
    setTimeout(function() {
        fondoInfoEscuela.style.visibility = 'hidden';
    }, 600);
}

const verInfoEstudiantes = async (evento) => {
    console.log('Esta es la info de los estudiantes');
    console.log(evento.target);
    const botonSeleccionado = evento.target;
    const tbodyEstudiantes = document.getElementById('tbody-estudiantes');
    const codigoModular = botonSeleccionado.value;
    const url = `http://localhost:3000/getStudents/${codigoModular}`;
    const responseEstudiantes = await axiosGet(url);
    const datosEstudiantes = responseEstudiantes[0];
    console.log(datosEstudiantes) //HASTA ACÁ YA RECOPILO LOS DATOS DEL ESTUDIANTE SELECCIONADO. FALTARIA MOSTRARLOS

    //PARA MOSTRAR TODOS LOS DATOS DE LOS ESTUDIANTES DE UNA ESCUELA -> SE USARÁ EL FOREACH
    tbodyEstudiantes.innerHTML = `

    `;
}   

const cerrarInfoEstudiantes = (evento) => {
    contenedorInfoEstudiantes.classList.toggle('cerrar-contenedor-modal');
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

//Este evento es para que cuando se de click en el Fondo Oscuro, cuando aparece la Ventana Emergente, hará que la Ventana Emergente se vaya
window.addEventListener('click', function(evento) {
    if(evento.target === fondoInfoEscuela) {
        contenedorInfoEscuela.classList.toggle('cerrar-contenedor-modal');
        setTimeout(function() {
            fondoInfoEscuela.style.visibility = 'hidden';
        }, 600);
    }
});

//AHORA QUEDA HACER QUE EL BOTÓN DE ESTUDIANTES, MUESTRE A LOS ESTUDIANTES