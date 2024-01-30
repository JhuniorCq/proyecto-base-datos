import axios from 'axios';

const escuelaSelect = document.getElementById('escuela-select');//YA ESTÀ QUE FUNCIONA CON AXIOS :,V , SOLO ERA PONER EL npm run dev

const funcion = async () => {
    try {
        const response = await axios.get('http://localhost:3000/assignProgram'); //el HOST del BACK ya no lo usarè, ORACLE no lo permite
        const schoolsData = response.data;

        console.log('xD', schoolsData);

    } catch(err) {
        console.error('Error en school.js', err.message);
    }
}

escuelaSelect.addEventListener('click', funcion);