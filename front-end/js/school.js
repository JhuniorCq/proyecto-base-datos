import axios from 'axios';

const escuelaSelect = document.getElementById('escuela-select');


const funcion = async () => {
    try {
        const response = await axios.get('https://edunex-solutions.onrender.com/assignProgram');
        // const response = await axios.get('file:///C:/Users/Jhunior/Desktop/ProyectoBaseDatos/proyecto-base-datos/front-end/asignarProgramas.html');
        const schoolsData = response.data;

        console.log(schoolsData);

    } catch(err) {
        console.error('Error en school.js', err.message);
    }
}



escuelaSelect.addEventListener('click', funcion);