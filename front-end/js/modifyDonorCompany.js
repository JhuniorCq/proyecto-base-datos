
import {
    id_company,
    id_program,
    programaSelect,
    nombreEmpresa,
    direccionEmpresa,
    emailEmpresa,
    celularEmpresa,
    montoDonacion,
    fechaDonacion
} from './viewDonorCompanies.js';

const modificarEmpresaDonante = async (evento) => {
    try {
        evento.preventDefault();

        console.log(id_company, id_program);
        console.log(programaSelect.value);
        console.log(nombreEmpresa.value);
        console.log(direccionEmpresa.value);
        console.log(emailEmpresa.value);
        console.log(celularEmpresa.value);
        console.log(montoDonacion.value);
        console.log(fechaDonacion.value);

        const fechaDonacionFormateada = fechaDonacion.value.split('-').reverse().join('/');

        const datosEmpresa = {
            program_id: programaSelect.value,
            company_name: nombreEmpresa.value,
            company_address: direccionEmpresa.value,
            company_cellphone: celularEmpresa.value,
            company_email: emailEmpresa.value,
            donation_amount: montoDonacion.value,
            donation_date: fechaDonacionFormateada
        }

        const url = `http://localhost:3000/modifyDonorCompanie/${id_company}/${id_program}`;

        const response = await axios.put(url, datosEmpresa);
        const result = response.data;

        alert(result);
        
    } catch(err) {
        console.error('', err.message);
    }
}

export {modificarEmpresaDonante};