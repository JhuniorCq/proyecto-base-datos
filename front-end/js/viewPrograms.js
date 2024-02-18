


const mostrarDatosProgramas = async () => {
    try {
        const url = '';
        const response = await axios.get(url);
        const programsData = response.data;


    } catch(err) {
        console.error('Error en mostrarDatosProgramas en viewPrograms.js', err.message)
    }
}

mostrarDatosProgramas();