const {SchoolRepository} = require('../repository/schoolRepository.js');
const schoolRepository = new SchoolRepository();

class SchoolService {
    
    async getSchools() {
        try {
            //LÓGICA

            //MANEJO DE LA BD -> LLAMAR A REPOSITORY
            const result = await schoolRepository.getSchools();

            return result; //Este result es un result.rows, porque así se retornó en schoolRepository
        } catch(err) {
            console.error('Error en la funcion getSchools en schoolRepository.js', err.message);
        }
    }

    async getSchool() {
        try {

        } catch(err) {
            console.error('', err.message);
        }
    }

    async enrollSchool(requestBody) {
        try {

            //LLAMAR A REPOSITORY
            const result = await schoolRepository.enrollSchool(requestBody);
            
            return result;
        } catch(err) {
            console.error('', err.message);
        }
    }

    async deleteSchool() {
        try {

        } catch(err) {
            console.error('', err.message);
        }
    }

    async updateSchool() {
        try {

        } catch(err) {
            console.error('', err.message);
        }
    }

}

module.exports = {
    SchoolService
}