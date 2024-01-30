
const escuelaSelect = document.getElementById('escuela-select');// El AXIOS da, pero con la CDN, con el import no da :,v

console.log('Se lee este archivo :,v');
const funcion = async () => {
    try {
        const response = await axios.get('http://localhost:3000/assignProgram');
        const schoolsData = response.data;

        console.log(schoolsData);

        const nombresEscuelas = schoolsData.map(datosEscuela => {
            return datosEscuela[1];
        });

        console.log(nombresEscuelas);

        const cantidadEscuelas = nombresEscuelas.length;

        for(const escuela of nombresEscuelas) {
            escuelaSelect.innerHTML = `
                <option>${escuela}</option>
            `;
        }

    } catch(err) {
        console.error('Error en school.js', err.message);
    }
}

escuelaSelect.addEventListener('click', funcion);