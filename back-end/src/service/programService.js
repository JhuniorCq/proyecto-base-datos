const {ProgramRepository} = require('../repository/programRepository.js');
const programRepository = new ProgramRepository();

class ProgramService {

    async assignProgram(dataProgram) {
        try {
            const {array_recursos} = dataProgram;
            if(array_recursos.length < 1) {
                console.error('Se debe asignar como mínimo un recurso.');
                return 'Error';
            }

            const result = await programRepository.assignProgram(dataProgram);

            return result;
        } catch(err) {
            console.error('Error en assignProgram en programService.js', err.message);
            throw err;
        }
    }

    async getPrograms() {
        try {
            const result = programRepository.getPrograms();

            return result;
        } catch(err) {
            console.error('Error en assignProgram en programService.js', err.message);
            throw err;
        }
    }

    async getProgram(id_program) {
        try {
            const result = programRepository.getProgram(id_program);

            return result;
        } catch(err) {
            console.error('', err.message);
            throw err;
        }
    }
}

module.exports = {
    ProgramService
}