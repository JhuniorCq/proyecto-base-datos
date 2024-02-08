const formulario = document.querySelector('.formulario');
const codigoModular = document.getElementById('codigo-modula');
const nombreEscuela = document.getElementById('nombre-escuela');
const direccionEscuela = document.getElementById('direccion');
const departamentoSelect = document.getElementById('departamentoSelect');
const provinciaSelect = document.getElementById('provinciaSelect');
const distritoSelect = document.getElementById('distritoSelect');

const nombresDirector = document.getElementById('nombres-director');
const apellidosDirector = document.getElementById('apellidos-director');
const telefonoDirector = document.getElementById('telefono');
const emailDirector = document.getElementById('director');

const funcion = (evento) => {
    //Evitar que el formulario se envíe de forma predeterminada, y que se recargue la página
    evento.preventDefault();

    console.log(codigoModular);
    console.log(nombreEscuela);
    console.log(direccionEscuela);
    console.log(departamentoSelect);
    console.log(provinciaSelect);
    console.log(distritoSelect);
    console.log(nombresDirector);
    console.log(apellidosDirector);
    console.log(telefonoDirector);
    console.log(emailDirector);
}


formulario.addEventListener('submit', funcion);