const axios = require('axios');
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

    async updateProgram(reqBody, id_program) {
        try {
            const {
                modular_code,
                program_name,
                program_description,
                objective,
                budget,
                start_date,
                end_date
            } = reqBody;

            const response = await axios.get(`http://localhost:3000/getProgram/${id_program}`);
            const datosPrograma = response.data[0];

            const dataProgram = {};

            //COMPAREMOS LOS DATOS QUE YA HAY CON LOS NUEVOS -> USAR OPERADOR TERNARIO
            modular_code === 'default'? dataProgram['modular_code'] = datosPrograma[5]: dataProgram['modular_code'] = modular_code;
            program_name === ''? dataProgram['program_name'] = datosPrograma[1]: dataProgram['program_name'] = program_name;
            program_description === ''? dataProgram['program_description'] = datosPrograma[2]: dataProgram['program_description'] = program_description;
            objective === ''? dataProgram['objective'] = datosPrograma[3]: dataProgram['objective'] = objective;
            budget === ''? dataProgram['budget'] = datosPrograma[4]: dataProgram['budget'] = budget;
            start_date === ''? dataProgram['start_date'] = datosPrograma[6]: dataProgram['start_date'] = start_date;
            end_date === ''? dataProgram['end_date'] = datosPrograma[7]: dataProgram['end_date'] = end_date;

            console.log(modular_code);
            const result = await programRepository.updateProgram(dataProgram, id_program);

            return result;

        } catch(err) {
            console.error('', err.message);
        }
    }
}

module.exports = {
    ProgramService
}