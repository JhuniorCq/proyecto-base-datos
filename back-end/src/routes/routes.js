const {Router} = require('express');
const router = Router();
const {getSchools, getSchool, enrollSchool, deleteSchool, updateSchool} = require('../controllers/schoolController.js');

// CONTROLLERS SCHOOLS

router.get('/enrollSchool:id', getSchool);
router.post('/enrollSchool', enrollSchool);
router.delete('/enrollSchool:id', deleteSchool);
router.put('/enrollSchool', updateSchool);


// CONTROLLERS PROGRAMS
router.get('/assignProgram', getSchools); //assignProgram -> Asignar Programa


module.exports = {
    router
};