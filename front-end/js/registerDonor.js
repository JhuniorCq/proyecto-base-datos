const programaSelect = document.getElementById('programa-select');
const formulario = document.querySelector('.formulario');
const nombreEmpresa = document.getElementById('nombre-empresa');
const direccionEmpresa = document.getElementById('direccion-empresa');
const emailEmpresa = document.getElementById('email-empresa');
const celularEmpresa = document.getElementById('celular-empresa');
const montoDonacion = document.getElementById('monto-donacion');
const fechaDonacion = document.getElementById('fecha-donacion');

const registrarEmpresaDonante = async (evento) => {
    evento.preventDefault();

    try {
        const nombreEmpresaValue = nombreEmpresa.value;
        const direccionEmpresaValue = direccionEmpresa.value;
        const emailEmpresaValue = emailEmpresa.value;
        const celularEmpresaValue = celularEmpresa.value;
        const programaSelectValue = programaSelect.value;
        const montoDonacionValue = montoDonacion.value;
        const fechaDonacionValue = fechaDonacion.value;
        const fechaDonacionFormateada = fechaDonacionValue.split('-').reverse().join('/');

        const datosEmpresaDonante = {
            company_name: nombreEmpresaValue,
            company_address: direccionEmpresaValue,
            company_cellphone: celularEmpresaValue,
            company_email: emailEmpresaValue,
            id_program: programaSelectValue,
            donation_amount: montoDonacionValue,
            donation_date: fechaDonacionFormateada
        }

        console.log(datosEmpresaDonante);
        const url = 'http://localhost:3000/registerDonor';

        const response = await axios.post(url, datosEmpresaDonante);
        const result = response.data;
        alert(result);
    } catch(err) {
        console.error('Error en registrarEmpresaDonante en registerDonor.js', err.message);
        alert('Hubo un error');
    }
}

const mostrarProgramas = async () => {
    try {
        const url = 'http://localhost:3000/getPrograms';
        const response = await axios.get(url);
        const datosProgramas = response.data;
        console.log(datosProgramas);

        datosProgramas.forEach(programa => {
            const optionPrograma = document.createElement('option');
            optionPrograma.innerText = programa[1];
            optionPrograma.value = programa[0]; // Le voy como value al id_program
            programaSelect.append(optionPrograma);
        });

    } catch(err) {
        console.error('Error en mostrarProgramas en registerDonor.js', err.message)
    }
}

const obtenerProgramaSeleccionado = async (id_program) => {
    try {
        const url = `http://localhost:3000/getProgram/${id_program}`;
        const response = await axios.get(url);
        const datosPrograma = response.data;
        return datosPrograma[1]; //Retorno el nombre del programa
    } catch(err) {
        console.error('Error en obtenerProgramaSeleccionado en registerDonor.js', err.message)
    }
}




mostrarProgramas();
formulario.addEventListener('submit', registrarEmpresaDonante);