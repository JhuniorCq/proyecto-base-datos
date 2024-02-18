const {Router} = require('express');
const router = Router();
const {getSchools, getSchool, enrollSchool, deleteSchool, updateSchool} = require('../controllers/schoolController.js');
const {getStudents} = require('../controllers/studentController.js');
const {assignProgram} = require('../controllers/programController.js');

const multer = require('multer'); // Necesarios para obtener los datos del Excel
const upload = multer({dest: 'uploads/'});

// CONTROLLERS SCHOOLS
router.get('/getSchool/:modular_code', getSchool);
router.post('/enrollSchool', upload.single('excelStudents'), enrollSchool);
router.delete('/enrollSchool:id', deleteSchool);
router.put('/enrollSchool', updateSchool);
router.get('/getSchools', getSchools); //assignProgram -> Asignar Programa
router.get('/getStudents/:modular_code', getStudents);

// CONTROLLERS PROGRAMS
router.post('/assignProgram', assignProgram);

module.exports = {
    router
};