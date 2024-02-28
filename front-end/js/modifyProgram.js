

const modificarPrograma = (evento) => {
    try {
        evento.preventDefault();
        console.log('Holi');
    } catch(err) {
        console.error('', err.message); 
    }
}


export {modificarPrograma};