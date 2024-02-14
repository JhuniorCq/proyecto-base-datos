const {Router} = require('express');
const router = Router();
const {getSchools, getSchool, enrollSchool, deleteSchool, updateSchool} = require('../controllers/schoolController.js');

const multer = require('multer'); // Necesarios para obtener los datos del Excel
const upload = multer({dest: 'uploads/'});

// CONTROLLERS SCHOOLS
router.get('/enrollSchool:id', getSchool);
router.post('/enrollSchool', upload.single('excelStudents'), enrollSchool);
router.delete('/enrollSchool:id', deleteSchool);
router.put('/enrollSchool', updateSchool);

// CONTROLLERS PROGRAMS
router.get('/assignProgram', getSchools); //assignProgram -> Asignar Programa


//RUTA PARA PROBAR LO DEL EXCEL
// router.post('/probandoExcel', upload.single('excelStudents'), (req, res) => {
//     try {//AL PONER upload.single ESTAMOS HACIENDO QUE SOLO SE PERMITA SUBIR UN SOLO ARCHIVO
//         //Multer lo que hace es que -> Cuando pasamos a través del Middleware upload.single('excelStudents') el excelStudents que le pasemos lo va a colocar toda su información dentro de -> req.file
//         console.log(req.file);
//         saveExcel(req.file);
//         res.send('Termina');
//     } catch(err) {
//         console.log('Error al descomponer el Excel', err.message);
//     }
// });

// function saveExcel(file) { //Con esta función vamos a 
//     const newPath = `./uploads/${file.originalname}`;
//     fs.renameSync(file.path, newPath);
//     return newPath;
// }

module.exports = {
    router
};