const {Router} = require('express');
const router = Router();
const {getSchools, getSchool, enrollSchool, deleteSchool, updateSchool} = require('../controllers/schoolController.js');

//enrollSchools -> Inscribir Escuelas
router.get('/enrollSchool', getSchools); 
router.get('/enrollSchool:id', getSchool);
router.post('/enrollSchool', enrollSchool);
router.delete('/enrollSchool:id', deleteSchool);
router.put('/enrollSchool', updateSchool);


module.exports = {
    router
};