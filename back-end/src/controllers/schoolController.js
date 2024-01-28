const {SchoolService} = require('../service/schoolService.js');
const schoolService = new SchoolService();

const getSchools = async (req, res) => {

    try {

        
        //LLAMAR A SERVICE PARA LA LÓGICA -> SERVICE HARÁ LA LÓGICA Y LLAMARÁ A REPOSITORY PARA EL MANEJO DE LA BD
        const result = await schoolService.getSchools();

        res.json(result); //Este result es un result.rows, porque así se retornó en schoolRepository
    } catch(err) {
        console.error('Error en la funcion getSchools en schoolController.js', err.message);
    }
}

const getSchool = async (req, res) => {
    try {

    } catch(err) {
        console.error('', err.message)
    }
}

const enrollSchool = async (req, res) => {
    try {
        const requestBody = req.body;
        
        //LLAMAR A SERVICE
        const result = await schoolService.enrollSchool(requestBody);

        console.log(result);
        res.json(result)
    } catch(err) {
        console.error('Error en enrollSchool en schoolController.js', err.message);
    }
}

const deleteSchool = async (req, res) => {
    try {

    } catch(err) {
        console.error('', err.message);
    }
}

const updateSchool = async (req, res) => {
    try {

    } catch(err) {
        console.error('', err.message);
    }
}

module.exports = {
    getSchools,
    getSchool,
    enrollSchool,
    deleteSchool,
    updateSchool
}