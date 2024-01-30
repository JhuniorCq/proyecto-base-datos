import axios from 'axios';

const escuelaSelect = document.getElementById('escuela-select');

console.log('Se lee este archivo :,v');
const funcion = async () => {
    try {
        // const response = await axios.get('https://edunex-solutions.onrender.com/assignProgram');
        const response = await axios.get('http://localhost:3000/assignProgram');
        const schoolsData = response.data;

        console.log(schoolsData);

    } catch(err) {
        console.error('Error en school.js', err.message);
    }
}



escuelaSelect.addEventListener('click', funcion);