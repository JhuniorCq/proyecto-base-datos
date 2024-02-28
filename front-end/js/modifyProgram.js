
import {
    id_program,
    escuelaSelect,
    nombrePrograma,
    descripcionPrograma,
    objetivoPrograma,
    presupuestoPrograma,
    fechaInicioPrograma,
    fechaFinPrograma
} from './viewPrograms.js'

const modificarPrograma = async (evento) => {
    try {
        evento.preventDefault();
        console.log(escuelaSelect.value);
        console.log(nombrePrograma.value);
        console.log(descripcionPrograma.value);
        console.log(objetivoPrograma.value);
        console.log(presupuestoPrograma.value);
        console.log(fechaInicioPrograma.value);
        console.log(fechaFinPrograma.value);
        console.log(id_program);

        const fechaInicioFormateada = fechaInicioPrograma.value.split('-').reverse().join('/');
        const fechaFinFormateada = fechaFinPrograma.value.split('-').reverse().join('/');

        const datosPrograma = {
            modular_code: escuelaSelect.value,
            program_name: nombrePrograma.value,
            program_description: descripcionPrograma.value,
            objective: objetivoPrograma.value,
            budget: presupuestoPrograma.value,
            start_date: fechaInicioFormateada,
            end_date: fechaFinFormateada
        }

        const url = `http://localhost:3000/modifyProgram/${id_program}`;
        const response = await axios.put(url, datosPrograma);
        const result = response.data;

        alert(result)

    } catch(err) {
        console.error('', err.message); 
    }
}


export {modificarPrograma};