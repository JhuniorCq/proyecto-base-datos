const {ProgramRepository} = require('../repository/programRepository.js');
const programRepository = new ProgramRepository();

class ProgramService {

    async assignProgram(dataProgram) {
        try {
            const result = await programRepository.assignProgram(dataProgram);

            return result;
        } catch(err) {
            console.error('', err.message)
        }
    }
}

module.exports = {
    ProgramService
}