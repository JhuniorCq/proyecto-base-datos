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

module.exports = {
    assignProgram
}