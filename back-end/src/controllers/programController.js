const {ProgramService} = require('../service/programService.js');
const programService = new ProgramService();

const assignProgram = async (req, res) => {
    try {
        const dataProgram = req.body;
        console.log(dataProgram); //Se imprime vacío
        const result = await programService.assignProgram(dataProgram);

        res.send(result);
    } catch(err) {
        console.error('Error en assignProgram en programController.js');
    }
}

const getPrograms = async (req, res) => {
    try {
        const result = await programService.getPrograms();

        //Retorna solo los datos de la Tabla Programs, NO de la Tabla Resources
        res.json(result);
    } catch(err) {
        console.error('', err.message);
    }
}

const getProgram = async (req, res) => {
    try {
        const {id_program} = req.params;
        const result = await programService.getProgram(id_program);

        res.json(result);
    } catch(err) {
        console.error('', err.message);
    }
}

module.exports = {
    assignProgram,
    getPrograms,
    getProgram
}