const {Router} = require('express');
const router = Router();
const {getSchools, getSchool, enrollSchool, deleteSchool, updateSchool} = require('../controllers/schoolController.js');
const {getStudents} = require('../controllers/studentController.js');
const {assignProgram, getPrograms, getProgram} = require('../controllers/programController.js');
const {getResources} = require('../controllers/resourceController.js')

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
router.get('/getPrograms', getPrograms);
router.get('/getProgram/:id_program', getProgram);
router.get('/getResources/:id_program', getResources);

module.exports = {
    router
};