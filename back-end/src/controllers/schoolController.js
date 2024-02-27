const {SchoolService} = require('../service/schoolService.js');
const schoolService = new SchoolService();

const getSchools = async (req, res) => {

    try {

        //LLAMAR A SERVICE PARA LA LÓGICA -> SERVICE HARÁ LA LÓGICA Y LLAMARÁ A REPOSITORY PARA EL MANEJO DE LA BD
        const result = await schoolService.getSchools();

        res.json(result);
    } catch(err) {
        console.error('Error en la funcion getSchools en schoolController.js', err.message);
    }
}

const getSchool = async (req, res) => {
    try {
        const {modular_code} = req.params;
        const result = await schoolService.getSchool(modular_code);

        res.json(result);
    } catch(err) {
        console.error('', err.message)
    }
}

const enrollSchool = async (req, res) => {
    try {
        const requestBody = req.body; // Acá se almacenan los datos que NO son archivos
        const requestFile = req.file; // Acá se almacenarán los Datos del archivo Excel
        
        //LLAMAR A SERVICE
        const result = await schoolService.enrollSchool(requestBody, requestFile); // Esto devuelve datos de Schools

        console.log('La inscripción en la escuela fue exitosa');
        res.status(200).send('La inscripción en la escuela fue exitosa');
    } catch(err) {
        console.error('Error en enrollSchool en schoolController.js', err.message);
        res.status(500).json({error: `Ocurrió un error al procesar la solicitud: ${err.message}`});
    }
}

const updateSchool = async (req, res) => {
    try {
        const {current_modular_code} = req.params;

        const result = await schoolService.updateSchool(req.body, req.file, current_modular_code);
    
        res.send(result)
    } catch(err) {
        console.error('Error en updateSchool en schoolController.js', err.message);
        return 'Error :,v';
    }
}

const deleteSchool = async (req, res) => {
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