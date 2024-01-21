const XLSX = require('xlsx');

const leerExcel = (ruta) => {
    //Con esto se Lee el Excel
    const workBook = XLSX.readFile(ruta);
    //Con esto almaceno cada Hoja del Excel en un Array
    const workBookSheets = workBook.SheetNames;
    //Almaceno a la Primera Hoja en la variable 'sheet'
    const sheet = workBookSheets[0];

    //Con esto convierto toda la Hoja en formato JSON, cada FILA será un Objeto -> En Total se Devolverá un ARRAY de OBJETOS
    const dataSheet = XLSX.utils.sheet_to_json(workBook.Sheets[sheet]); // Se utiliza la variable workBook que creamos, y aplicamos el método Sheets -> y dentro de los [ ] colocamos a la Variable 'sheet' que contiene la HOJA que queramos usar

    console.log(dataSheet);
}

leerExcel('estudiantes.xlsx');