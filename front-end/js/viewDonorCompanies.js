const tbodyEmpresas = document.getElementById('tbody-empresas');
const fondoInfoEmpresa = document.getElementById('fondo-modal1');
const contenedorInfoEmpresa = document.getElementById('contenedor-modal1');
const btnCerrarInfoEmpresa = document.getElementById('btn-cerrar1');

const fondoModificarEmpresa = document.getElementById('fondo-modal2');
const contenedorModificarEmpresa = document.getElementById('contenedor-modal2');
const btnCerrarModificacion = document.getElementById('btn-cerrar2');

const mostrarDatosEmpresas = async () => {
    try {
        const url = 'http://localhost:3000/getDonorCompanies';
        const response = await axios.get(url);
        const datosEmpresas = response.data;

        console.log(datosEmpresas)
        let iterador = 0;

        for(const empresa of datosEmpresas) {
            const idEmpresa = empresa[0];
            const nombreEmpresa = empresa[1];
            const montoDonacion = empresa[5];
            const nombrePrograma = empresa[8];

            const filaEmpresa = document.createElement('tr');
            filaEmpresa.innerHTML = `
                <td>${nombreEmpresa}</td>
                <td>${montoDonacion}</td>
                <td>${nombrePrograma}</td>
                <td>
                    <button class="btn-ver-empresa opcion" id="btn-ver-empresa${iterador}" value="${idEmpresa}">Ver empresa</button>
                    <i class="bi bi-pencil-square btn-modificar opcion" id="btn-modificar${iterador}"></i>
                    <i class="bi bi-x-square-fill btn-eliminar opcion" id="btn-eliminar${iterador}"></i>
                </td>
            `;

            tbodyEmpresas.append(filaEmpresa);

            const btnVerEmpresa = document.getElementById(`btn-ver-empresa${iterador}`);
            const btnModificar = document.getElementById(`btn-modificar${iterador}`);
            const btnEliminar = document.getElementById(`btn-eliminar${iterador}`);
            btnVerEmpresa.addEventListener('click', verInfoEmpresa);
            btnModificar.addEventListener('click', modificarDatosEmpresa);
            btnEliminar.addEventListener('click', eliminarEmpresa);

            iterador++;
        }
    } catch(err) {
        console.error('Error en mostrarDatosEmpresas en viewDonorCompanies.js', err.message);
    }
}

const verInfoEmpresa = async (evento) => {
    const botonSeleccionado = evento.target;
    const tbodyEmpresa = document.getElementById('tbody-empresa');
    const idEmpresa = botonSeleccionado.value;

    console.log(idEmpresa);
    const url = `http://localhost:3000/getDonorCompanie/${idEmpresa}`;
    const responseEmpresa = await axios.get(url);
    const datosEmpresa = responseEmpresa.data[0];
    const fechaDonacionFormateada = datosEmpresa[6].split('T')[0];

    tbodyEmpresa.innerHTML =  `
        <tr>
            <td>Empresa</td>
            <td>${datosEmpresa[1]}</td>
        </tr>
        <tr>
            <td>Dirección</td>
            <td>${datosEmpresa[2]}</td>
        </tr>
        <tr>
            <td>Teléfono</td>
            <td>${datosEmpresa[3]}</td>
        </tr>
        <tr>
            <td>E-mail</td>
            <td>${datosEmpresa[4]}</td>
        </tr>
        <tr>
            <td>Monto donado</td>
            <td>${datosEmpresa[5]}</td>
        </tr>
        <tr>
            <td>Fecha de la donación</td>
            <td>${fechaDonacionFormateada}</td>
        </tr>
        <tr>
            <td>Programa donado</td>
            <td>${datosEmpresa[8]}</td>
        </tr>
    `;

    //Hacemos visible la ventana emergente con los datos de la empresa donante seleccionada
    fondoInfoEmpresa.style.visibility = 'visible';
    contenedorInfoEmpresa.classList.toggle('cerrar-contenedor-modal');
}

const cerrarInfoEmpresa = () => {
    cerrarVentanaEmergente(contenedorInfoEmpresa, fondoInfoEmpresa);
}

const modificarDatosEmpresa = (evento) => {
    const botonSeleccionado = evento.target;
    console.log(botonSeleccionado);

    //Hacemos visible la ventana emergente para modificar una escuela
    fondoModificarEmpresa.style.visibility = 'visible';
    contenedorModificarEmpresa.classList.toggle('cerrar-contenedor-modal');
}

const cerrarModificarEmpresa = () => {
    cerrarVentanaEmergente(contenedorModificarEmpresa, fondoModificarEmpresa);
}

const cerrarVentanaEmergente = (contenedor, fondo) => {
    contenedor.classList.toggle('cerrar-contenedor-modal');
    //Este setTimeout es para que se aprecie la Transición y no se cierre la ventana de frente
    setTimeout(function() {
        fondo.style.visibility = 'hidden';
    }, 600);
}

const eliminarEmpresa = () => {

}

mostrarDatosEmpresas();

btnCerrarInfoEmpresa.addEventListener('click', cerrarInfoEmpresa);
btnCerrarModificacion.addEventListener('click', cerrarModificarEmpresa);

window.addEventListener('click', function(evento) {
    if(evento.target === fondoInfoEmpresa) {
        cerrarVentanaEmergente(contenedorInfoEmpresa, fondoInfoEmpresa);
    } else if(evento.target === fondoModificarEmpresa) {
        cerrarVentanaEmergente(contenedorModificarEmpresa, fondoModificarEmpresa);
    }
})