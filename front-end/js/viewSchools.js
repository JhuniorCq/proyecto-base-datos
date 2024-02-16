

const mostrarDatosEscuelas = async () => {
    try {
        const response = await axios.get('http://localhost:3000/getSchools');
        const schoolsData = response.data;

        console.log(schoolsData);

    } catch(err) {
        console.error('Error al obtener datos de las esculas.', err.message);
    }
}

mostrarDatosEscuelas();