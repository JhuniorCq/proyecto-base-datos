
const escuelaSelect = document.getElementById('escuela-select');// NO DA CON EL AXIOS :,v

console.log('Se lee este archivo :,v');
const funcion = async () => {
    try {
        const response = await axios.get('http://localhost:3000/assignProgram');
        // const response = await fetch('http://localhost:3000/assignProgram');
        const schoolsData = response.data;
        
        // if (!response.ok) {
        //     throw new Error(`Error al realizar la solicitud: ${response.statusText}`);
        // }
        
        // const schoolsData = await response.json();

        console.log(schoolsData);

    } catch(err) {
        console.error('Error en school.js', err.message);
    }
}

escuelaSelect.addEventListener('click', funcion);