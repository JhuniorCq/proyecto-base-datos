import axios from 'axios';

const escuelaSelect = document.getElementById('escuela-select');//YA ESTÀ QUE FUNCIONA CON AXIOS :,V , SOLO ERA PONER EL npm run dev

console.log('Se lee este archivo :,v');
const funcion = async () => {
    try {
        // const response = await axios.get('https://edunex-solutions.onrender.com/assignProgram');
        const response = await axios.get('http://localhost:3000/assignProgram');
        // const response = await fetch('http://localhost:3000/assignProgram');
        const schoolsData = response.data;
        
        // if (!response.ok) {
        //     throw new Error(`Error al realizar la solicitud: ${response.statusText}`);
        // }
        
        // const schoolsData = await response.json();
        console.log('ahhhhh')
        console.log('xD', schoolsData);

    } catch(err) {
        console.error('Error en school.js', err.message);
    }
}

escuelaSelect.addEventListener('click', funcion);