const {Router} = require('express');
const router = Router();
const {getSchools, getSchool, enrollSchool, deleteSchool, updateSchool} = require('../controllers/schoolController.js');
const {getStudents} = require('../controllers/studentController.js');
const {assignProgram, getPrograms, getProgram, updateProgram, deleteProgram} = require('../controllers/programController.js');
const {getResources} = require('../controllers/resourceController.js')
const {registerDonorCompany, getDonorCompanies, getDonorCompanie, updateDonorCompanie, deleteDonorCompanie, getDonation} = require('../controllers/donorCompanyController.js')

const multer = require('multer'); // Necesarios para obtener los datos del Excel
const upload = multer({dest: 'uploads/'});

// CONTROLLERS SCHOOLS Y STUDENTS
router.get('/getSchool/:modular_code', getSchool);
router.post('/enrollSchool', upload.single('excelStudents'), enrollSchool);
router.delete('/enrollSchool/:id', deleteSchool);
router.put('/modifySchool/:current_modular_code', upload.single('excelStudents'), updateSchool);
router.get('/getSchools', getSchools);
router.get('/getStudents/:modular_code', getStudents);
router.delete('/deleteSchool/:modular_code', deleteSchool);

// CONTROLLERS PROGRAMS Y RESOURCES
router.post('/assignProgram', assignProgram);
router.get('/getPrograms', getPrograms);
router.get('/getProgram/:id_program', getProgram);
router.get('/getResources/:id_program', getResources);
router.put('/modifyProgram/:id_program', updateProgram);
router.delete('/deleteProgram/:id_program', deleteProgram);

// CONTROLLERS DONORCOMPANY
router.post('/registerDonor', registerDonorCompany);
router.get('/getDonorCompanies', getDonorCompanies);
router.get('/getDonorCompanie/:id_company', getDonorCompanie);
router.put('/modifyDonorCompanie/:id_company/:id_program', updateDonorCompanie);
router.delete('/deleteDonorCompanie/:id_company/:id_program', deleteDonorCompanie);
router.get('/getDonation/:id_company/:id_program', getDonation);

module.exports = {
    router
};